package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.userinfo.UserInfoAuthSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaUserInfoAuthSearchRepository extends JpaRepository<UserInfoAuthSearch, String>{

}