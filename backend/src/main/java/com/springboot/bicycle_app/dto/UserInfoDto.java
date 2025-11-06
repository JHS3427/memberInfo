package com.springboot.bicycle_app.dto;


import lombok.Data;

@Data
public class UserInfoDto {
    private String uid;
    private String upass;
    private String uname;
    private int uage;
    private String ugender;
    private String uaddress;
    private String uemail;
    private String uphone;

    public UserInfoDto(){}
    public UserInfoDto(String uid, String upass) {
        this.uid = uid;
        this.upass = upass;
    }
}
