package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.service.OauthJWTService;
import com.springboot.bicycle_app.service.OauthJWTServiceImpl;
import com.springboot.bicycle_app.service.OauthService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class OauthController {

    private final OauthService oauthService;
    private final AuthenticationManager authenticationManager;
    private final HttpSessionSecurityContextRepository contextRepository;
    private final OauthJWTService oauthJWTService;

    public OauthController(OauthService oauthService,
                           AuthenticationManager authenticationManager,
                           HttpSessionSecurityContextRepository contextRepository,
                           OauthJWTService oauthJWTService)
    {
        this.oauthService = oauthService;
        this.authenticationManager = authenticationManager;
        this.contextRepository = contextRepository;
        this.oauthJWTService = oauthJWTService;
    }

    @PostMapping("/token")
    public UserInfoDto gettoken(@RequestBody Token token){
        String authcode;
        String socialId;
        System.out.println("social : "+token.getSocial());
        System.out.println("auth : "+token.getAuthCode());
        if(token.getSocial().equals("google"))//구글은 중간 토큰 요청없이 access토큰을 바로 넘겨준다.
            //https://ldd6cr-adness.tistory.com/323 참고
        {
            socialId = oauthService.socialIdCatcher(token.getAuthCode(),token.getSocial());
        }
        else
        {
            authcode = oauthService.getSocialAccessToken(token);
            socialId = oauthService.socialIdCatcher(authcode,token.getSocial());
        }
        UserInfoDto socialIdChecker = new UserInfoDto();
        socialIdChecker.setUid(socialId);
        String jwToken = oauthJWTService.createToken(socialId,"Role_USSR");
        socialIdChecker.setJwToken(jwToken);

        boolean Social_reuslt_b = idDuplCheck(socialIdChecker);//false면 겹치는거 없음. true면 겹치는거 있음
        String Social_reuslt_s;
        if(Social_reuslt_b){
            Social_reuslt_s = "duplicate on " + token.getSocial();
            socialIdChecker.setSocialDupl(true);
            }
        else{
            Social_reuslt_s = "duplicate off" + token.getSocial();
            socialIdChecker.setUid("");
            socialIdChecker.setSocialDupl(false);
        }
        return socialIdChecker;
    }

    @PostMapping("/idDuplCheck")
    public boolean idDuplCheck(@RequestBody UserInfoDto userInfo){
        return oauthService.idDuplChecker(userInfo.getUid());
    }

    @PostMapping("/signup")
    public int signup(@RequestBody UserInfoDto userInfoDto){
        if(userInfoDto.isSocialDupl())//true면 일반 회원가입
        {
            System.out.println("imhere~~~~~~~~~~");
            return oauthService.signUp(userInfoDto);
        }
        else{//false면 소셜로그인 해서 겹치는 게 없어서 들어온 회원가입
            System.out.println("imhere2222222222222~~~~~~~~~~");
            String JWToken = userInfoDto.getJwToken();
            Claims claim = oauthJWTService.getClaims(JWToken);
            userInfoDto.setUid(claim.getSubject());
            userInfoDto.setUpass("");
            return oauthService.signUp(userInfoDto);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserInfoDto userInfo,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        try {
            System.out.println("인증 성공1 ");

            if(userInfo.isSocialDupl())
            {
                System.out.println("change start ");
                //jw토큰 받아다가 바꿔서 id에 넣기, 패스워드는 빈칸으로 세팅
                userInfo.setJwToken(userInfo.getUid());
                String JWToken = userInfo.getUid();//uid에 토큰 넣어옴
                Claims claim = oauthJWTService.getClaims(JWToken);
                userInfo.setUid(claim.getSubject());
                userInfo.setUpass("");
            }
            //1. 인증 요청
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(userInfo.getUid(), userInfo.getUpass());
            System.out.println("authenticationResponse2 "+userInfo.getUid()+ userInfo.getUpass());

            //2. 인증 처리
            Authentication authenticationResponse =
                    this.authenticationManager.authenticate(authenticationRequest);

            System.out.println("authenticationResponse3 "+userInfo.getUid()+ userInfo.getUpass());
            System.out.println("인증 성공: " + authenticationResponse.getPrincipal());

            //3. 컨텍스트에 보관: 세션과 함께 저장, 만료때까지 저장됨.
            var context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationResponse);
            SecurityContextHolder.setContext(context);

            // SecurityContext 세션에 "명시 저장" (requireExplicitSave(true)일 때 필수)
            contextRepository.saveContext(context, request, response);

            //4. 로그인 성공 시 CSRF 토큰을 재발행을 위해 브라우저 토큰 null 처리
            var xsrf = new Cookie("XSRF-TOKEN", null);
            xsrf.setPath("/");               // ← 기존과 동일
            xsrf.setMaxAge(0);               // ← 즉시 만료
            xsrf.setHttpOnly(false);          // 개발 중에도 HttpOnly 유지 권장
            // cookie.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
            // cookie.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
            response.addCookie(xsrf);


            if(userInfo.isSocialDupl()) {
                return ResponseEntity.ok(Map.of("login", true,
                        "userId", userInfo.getJwToken()));
            }
            else {
                return ResponseEntity.ok(Map.of("login", true,
                        "userId", userInfo.getUid()));
            }
        }catch(Exception e) {
            //로그인 실패
            return ResponseEntity.ok(Map.of("login", false));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request,
                                    HttpServletResponse response) {

        // 1. 세션이 없으면 생성하지 않고 null 반환 (로그아웃 시 표준 방식)
        HttpSession session = request.getSession(false);

        // 2. 세션이 존재하면 무효화
        if(session != null) {
            session.invalidate(); // 서버 세션 무효화 (JSESSIONID 삭제 명령 포함)
        }

        // 3. JSESSIONID 만료 쿠키 전송 (Path/Domain 꼭 기존과 동일)
        var cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");               // ← 기존과 동일
        cookie.setMaxAge(0);               // ← 즉시 만료
        cookie.setHttpOnly(true);          // 개발 중에도 HttpOnly 유지 권장
        // cookie.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
        // cookie.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
        response.addCookie(cookie);

        // 4. CSRF 토큰을 재발행하여 출력
        var xsrf = new Cookie("XSRF-TOKEN", null);
        xsrf.setPath("/");               // ← 기존과 동일
        xsrf.setMaxAge(0);               // ← 즉시 만료
        xsrf.setHttpOnly(false);          // 개발 중에도 HttpOnly 유지 권장
        // xsrf.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
        // xsrf.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
        response.addCookie(xsrf);


        // 3. 응답: 세션이 있었든 없었든, 클라이언트에게 로그아웃 요청이 성공했음을 알림 (200 OK)
        //    JSESSIONID 쿠키 삭제는 session.invalidate() 시 서블릿 컨테이너가 처리합니다.
        return ResponseEntity.ok(Map.of("logout", true));
    }


}
