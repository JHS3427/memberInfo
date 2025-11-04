package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.ChatbotFaq;
import java.util.List;

public interface ChatbotRepository {
    ChatbotFaq findByKeyword(String message);
    int save(ChatbotFaq faq);
    int count();
    List<ChatbotFaq> findAll();
}
