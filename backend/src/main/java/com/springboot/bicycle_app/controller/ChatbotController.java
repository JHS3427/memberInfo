package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:3000") // React 연결 허용
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping
    public Map<String, Object> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        return chatbotService.getChatbotResponse(message);
    }
}
