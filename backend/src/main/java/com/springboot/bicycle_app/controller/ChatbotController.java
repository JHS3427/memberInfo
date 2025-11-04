package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React 연결 허용
public class ChatbotController {

    private final ChatbotService chatbotService;

    @PostMapping
    public Map<String, Object> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        return chatbotService.getChatResponse(message);
    }
}
