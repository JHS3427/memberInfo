package com.springboot.bicycle_app.service;


import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfoDto;

public interface OauthService {
    String getSocialAccessToken(Token token);
    String socialIdCatcher(String authcode,String social);
    boolean idDuplChecker(String id);
    int signUp(UserInfoDto userInfo);
    String encryptString(String socialId);
}
