package com.springboot.bicycle_app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bicycle_app.dto.ChatbotFaq;
import com.springboot.bicycle_app.repository.ChatbotRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatbotServiceImpl implements ChatbotService {

    private final ChatbotRepository chatbotRepository;
    private final GeminiService geminiService; // ✅ Gemini 백업용 서비스 추가
    private final ObjectMapper mapper = new ObjectMapper();

    // ✅ 서버 시작 시 JSON → DB 자동 로드
    @PostConstruct
    public void initChatbotData() {
        try {
            if (chatbotRepository.count() == 0) {
                InputStream is = new ClassPathResource("data/chatbot_data.json").getInputStream();
                List<ChatbotFaq> list = mapper.readValue(is, new TypeReference<List<ChatbotFaq>>() {});
                list.forEach(chatbotRepository::save);
                System.out.println("✅ chatbot_data.json → DB 로드 완료 (" + list.size() + "건)");
            } else {
                System.out.println("ℹ️ chatbot_faq 테이블에 기존 데이터 존재");
            }
        } catch (Exception e) {
            System.err.println("❌ chatbot_data.json 로드 실패: " + e.getMessage());
        }
    }

    // ✅ 메인 응답 처리 (DB → Gemini 순으로 검색)
    @Override
    public Map<String, Object> getChatResponse(String userMessage) {
        Map<String, Object> result = new HashMap<>();

        try {
            // 1️⃣ DB 검색
            ChatbotFaq faq = chatbotRepository.findByKeyword(userMessage);

            if (faq != null) {
                result.put("reply", faq.getAnswer());
                result.put("linkText", faq.getLinkText());
                result.put("linkUrl", faq.getLinkUrl());
                return result;
            }

            // 2️⃣ DB에 없으면 Gemini AI 백업 호출
            String aiReply = geminiService.askGemini(userMessage);
            result.put("reply", aiReply);

        } catch (Exception e) {
            result.put("reply", "죄송합니다 😢 관련 정보를 찾지 못했습니다. ‘A/S’, ‘배송’, ‘환불’ 같은 키워드를 입력해보세요.");
        }

        return result;
    }
}
