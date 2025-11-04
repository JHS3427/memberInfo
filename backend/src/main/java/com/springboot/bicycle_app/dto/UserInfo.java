package com.springboot.bicycle_app.dto;


import lombok.Data;

@Data
public class UserInfo {
    private String uid;
    private String upass;
    private String uname;
    private int uage;
    private String ugender;
    private String uaddress;
    private String uemail;
    private String uphone;
}
