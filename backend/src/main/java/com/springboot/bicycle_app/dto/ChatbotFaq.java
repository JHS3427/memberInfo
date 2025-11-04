package com.springboot.bicycle_app.dto;

import lombok.Data;

@Data
public class ChatbotFaq {
    private int id;
    private String keyword;
    private String question;
    private String answer;
    private String linkText;
    private String linkUrl;
}
