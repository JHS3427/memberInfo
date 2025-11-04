package com.springboot.bicycle_app.service;

import java.util.Map;

public interface ChatbotService {
    Map<String, Object> getChatResponse(String message);
}