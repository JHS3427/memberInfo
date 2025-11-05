package com.springboot.bicycle_app.dto;

import lombok.Data;

import java.util.List;

@Data
public class Travel {
    private int fid;
    private String fname;
    private Double flike;
    private int score;
    private int evaluation;
    private List<String> tag;
    private String image1;
    private String image2;
    private String image3;
    private String fullImage1;
    private String fullImage2;
    private String fullImage3;
    private String description;
}
