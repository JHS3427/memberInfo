package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.UserInfo;

public interface UserInfoRepository {

    boolean idDuplChecker(String id);
    int signup(UserInfo userInfo);
}
