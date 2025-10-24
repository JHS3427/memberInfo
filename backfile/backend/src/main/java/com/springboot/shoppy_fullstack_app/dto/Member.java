package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data

public class Member {
    private String id;
    private String pwd;
    private String cpwd;
    private String name;
    private String phone;
    private String email;


    //롬복으로 setter/getter 없애고 깔끔하게 만들기
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getPwd() {
//        return pwd;
//    }
//
//    public void setPwd(String pwd) {
//        this.pwd = pwd;
//    }
//
//    public String getCpwd() {
//        return cpwd;
//    }
//
//    public void setCpwd(String cpwd) {
//        this.cpwd = cpwd;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
}
