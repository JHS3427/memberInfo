package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfo;
import com.springboot.bicycle_app.service.OauthService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class OauthController {
    private OauthService oauthService;

    public OauthController(OauthService oauthService)
    {
        this.oauthService = oauthService;
    }

    @PostMapping("/token")
    public String gettoken(@RequestBody Token token){
        System.out.println("social : "+token.getSocial());
        System.out.println("auth : "+token.getAuthCode());
        String authcode = oauthService.getSocialAccessToken(token);
        String socialId = oauthService.socialIdCatcher(authcode,token.getSocial());

        return socialId;
    }

    @PostMapping("/idDuplCheck")
    public boolean idDuplCheck(@RequestBody UserInfo userInfo){
        System.out.println("ID : "+userInfo.getUid());
        return oauthService.idDuplChecker(userInfo.getUid());
    }

    @PostMapping("/signup")
    public int signup(@RequestBody UserInfo userInfo){

        return oauthService.signUp(userInfo);
    }

}
