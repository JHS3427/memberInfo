package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;

public interface MemberService {

    int signup(Member member);
    boolean idcheck(String id);
    boolean login(Member member);
}