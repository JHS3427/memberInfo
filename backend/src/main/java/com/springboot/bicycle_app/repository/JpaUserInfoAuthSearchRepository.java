package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.userinfo.UserInfoAuthSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaUserInfoAuthSearchRepository extends JpaRepository<UserInfoAuthSearch, String>{

    Optional<UserInfoAuthSearch> findByAuthcodeAndUnameAndUemail(@Param("authcode") String authcode,
                                                @Param("uname") String uname,
                                                @Param("uemail") String uemail);

    void deleteByAuthcode(@Param("authcode") String authcode);
}