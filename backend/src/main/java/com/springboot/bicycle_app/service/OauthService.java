package com.springboot.bicycle_app.service;


import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfo;

public interface OauthService {
    String getSocialAccessToken(Token token);
    String socialIdCatcher(String authcode,String social);
    boolean idDuplChecker(String id);
    int signUp(UserInfo userInfo);
}
