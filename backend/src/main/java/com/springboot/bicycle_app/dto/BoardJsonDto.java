package com.springboot.bicycle_app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardJsonDto {
    private int bid;
    private String uid;
    private String writer;
    private String title;
    private String content;
    private String imageUrl;
    private String thumbnailUrl;
    private String categoryTag;
    private String status;
}
