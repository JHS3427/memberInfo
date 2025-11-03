package com.springboot.bicycle_app.service;


import com.springboot.bicycle_app.dto.Token;

public interface OauthService {
    String getSocialAccessToken(Token token);
    String socialIdCatcher(String authcode,String social);
}
