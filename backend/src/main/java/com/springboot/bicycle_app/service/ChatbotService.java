package com.springboot.bicycle_app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatbotService {

    @Value("${gemini.api-key}")
    private String geminiApiKey;

    @Value("${gemini.url}")
    private String geminiUrl;

    // ✅ 프리셋(자주 묻는 질문) + Gemini 혼합 챗봇
    public Map<String, Object> getChatbotResponse(String message) {
        Map<String, Object> result = new HashMap<>();
        String lower = message.toLowerCase();

        // -------- 🎯 1️⃣ 프리셋 답변 우선 처리 --------
        if (containsAny(lower, "환불", "반품", "교환")) {
            result.put("reply", "제품 환불 및 교환은 배송 완료 후 7일 이내 고객센터(☎ 02-1234-5678)로 문의해주세요.");
            return result;
        }
        if (containsAny(lower, "배송", "택배", "배송비")) {
            result.put("reply", "배송은 결제일로부터 평균 2~3일 소요됩니다 🚚 (주말 및 공휴일 제외)");
            return result;
        }
        if (containsAny(lower, "사이즈", "크기", "프레임")) {
            result.put("reply", "자전거 사이즈는 키와 인심 길이에 따라 달라요. 평균적으로 170cm면 52~54cm가 적당합니다 🚴‍♂️");
            return result;
        }
        if (containsAny(lower, "고장", "수리", "AS", "a/s")) {
            result.put("reply", "A/S는 구매일로부터 1년간 무상 제공됩니다. 자세한 내용은 고객센터로 문의해주세요 ☎ 02-1234-5678");
            return result;
        }
        if (containsAny(lower, "영업시간", "운영시간", "문의", "고객센터")) {
            result.put("reply", "고객센터 운영시간은 평일 오전 9시~오후 6시입니다. (토·일·공휴일 휴무)");
            return result;
        }

        // -------- 🤖 2️⃣ 프리셋에 해당 안 되면 Gemini 호출 --------
        return callGemini(message);
    }

    // ✅ 특정 단어가 포함되어 있는지 확인하는 유틸
    private boolean containsAny(String text, String... keywords) {
        for (String keyword : keywords) {
            if (text.contains(keyword.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    // ✅ Gemini API 호출 함수
    private Map<String, Object> callGemini(String message) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text",
                                        "너는 자전거 쇼핑몰 Bicycle-App의 고객센터 챗봇이야. 🚴‍♀️\n"
                                                + "고객에게 친절하고 간단하게 1~2문장으로 답변해.\n"
                                                + "필요할 땐 고객센터 번호(02-1234-5678)를 안내해줘.\n\n"
                                                + "고객 질문: " + message)
                        ))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String urlWithKey = geminiUrl + "?key=" + geminiApiKey;

        Map<String, Object> result = new HashMap<>();
        try {
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(urlWithKey, new HttpEntity<>(requestBody, headers), Map.class);

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                result.put("reply", parts.get(0).get("text"));
            } else {
                result.put("reply", "응답을 받지 못했습니다 😢");
            }
        } catch (Exception e) {
            result.put("reply", "⚠️ Gemini API 요청 중 오류가 발생했습니다.");
            e.printStackTrace();
        }
        return result;
    }
}
