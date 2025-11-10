package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.UserInfoDto;
//import com.springboot.bicycle_app.repository.MemberRepository;
import com.springboot.bicycle_app.repository.JpaUserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    //    private final MemberRepository memberRepository;
    private final JpaUserInfoRepository jpaUserInfoRepository;
    @Autowired
    public CustomUserDetailsService(//MemberRepository memberRepository,
                                    JpaUserInfoRepository jpaUserInfoRepository) {
//        this.memberRepository = memberRepository;
        this.jpaUserInfoRepository=jpaUserInfoRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//        MemberDto member = memberRepository.findByMember(userId)
        UserInfoDto userInfo = jpaUserInfoRepository.findByUserInfo(userId)
                .orElseThrow(() -> new UsernameNotFoundException("not found: " + userId));
        //member가 null이 아니면 User 객체, 즉 회원으로 인증되어 SecurityContext에 저장됨.

        User.UserBuilder b = User.withUsername(userInfo.getUid())
                .password(userInfo.getUpass())    // BCrypt로 저장되어 있어야 함
                .roles("USER");                   // 필요 시 DB에서 권한 매핑
        return b.build();
    }
}