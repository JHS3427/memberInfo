package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.service.MemberService;
import com.springboot.shoppy_fullstack_app.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.springboot.shoppy_fullstack_app.dto.Member;
//import com.springboot.shoppy_fullstack_app.dto.Token;

@RestController
@RequestMapping("/member")
//@CrossOrigin(origins = {"http://localhost:3000"}) 윈도우는 괜찮지만 다른 OS에서는 이거랑 securityconfig.java 파일에 설정된거랑 충돌난다.
//@ Transactional :DB가 auto commit 모드면 생략 가능
public class memberController {

    //서비스 객체 가져오기
    private final MemberService memberService;

    //생성자
    @Autowired
    public memberController(MemberService memberService ){
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Member member){
        boolean result = memberService.login(member);
        return result;
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody Member member){
        //서비스 호출
        boolean result = false;
        int rows = memberService.signup(member);
        if(rows==1)
        {result=true;}
        return result;
    }
    @PostMapping("/idcheck")//Member에 id 변수가 있으니까 Member로 받는게 편하다.
    public String idcheck(@RequestBody Member member){
        boolean result = memberService.idcheck(member.getId());
        String msg = "";
        if(result)
        { msg = " 사용 가능한 아이디";}
        else
        {msg = " 사용 중인 아이디";}
        return msg;
    }


}
