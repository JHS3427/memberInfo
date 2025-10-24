package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service//memberServiceImpl
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository,PasswordEncoder passwordEncoder){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;

    }

    @Override
    public int signup(Member member){
        //패스워드 인코딩 후 member 객체에 패스워드 세팅
        String encodePwd = passwordEncoder.encode(member.getPwd());//UUID타입으로 생성됨
        member.setPwd(encodePwd);

        System.out.println("encodePwd : "+encodePwd);
        return memberRepository.save(member);
    }

    @Override
    public boolean idcheck(String id){
        boolean result = false;
        Long count = memberRepository.findById(id);
        if(count==0){result = true;}
        return result;
    }

    @Override
    public boolean login(Member member){
//        boolean result = false;
        String encodePwd = memberRepository.login(member.getId());
        System.out.println(encodePwd);
        boolean result = passwordEncoder.matches(member.getPwd(),encodePwd);
//        if(count!=0){result=true;}
        return result;
    }
}
