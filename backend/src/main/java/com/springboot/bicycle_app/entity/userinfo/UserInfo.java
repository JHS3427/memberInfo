package com.springboot.bicycle_app.entity.userinfo;

import com.springboot.bicycle_app.dto.UserInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="userinfo")
@Setter
@Getter
public class UserInfo {
    @Id
    private String uid;
    private String upass;
    private String uname;
    private int uage;
    private String ugender;
    private String uaddress;
    private String uemail;
    private String uphone;

    public UserInfo(){}
    public UserInfo(UserInfoDto userInfoDto){
        this.uid = userInfoDto.getUid();
        this.upass = userInfoDto.getUpass();
        this.uname = userInfoDto.getUname();
        this.uage = userInfoDto.getUage();
        this.ugender = userInfoDto.getUgender();
        this.uaddress = userInfoDto.getUaddress();
        this.uemail = userInfoDto.getUemail();
        this.uphone = userInfoDto.getUphone();
    }

}
