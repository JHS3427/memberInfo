package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.ChatbotFaq;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class JdbcTemplateChatbotRepository implements ChatbotRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public ChatbotFaq findByKeyword(String message) {
        String sql = """
            SELECT * FROM chatbot_faq
            WHERE LOWER(keyword) LIKE CONCAT('%', LOWER(?), '%')
            LIMIT 1
        """;

        List<ChatbotFaq> list = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(ChatbotFaq.class),
                message.trim()  // 공백 제거
        );

        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public int save(ChatbotFaq faq) {
        String sql = """
            INSERT INTO chatbot_faq (keyword, question, answer, link_text, link_url)
            VALUES (?, ?, ?, ?, ?)
        """;
        return jdbcTemplate.update(sql,
                faq.getKeyword(), faq.getQuestion(), faq.getAnswer(),
                faq.getLinkText(), faq.getLinkUrl());
    }

    @Override
    public int count() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM chatbot_faq", Integer.class);
    }

    @Override
    public List<ChatbotFaq> findAll() {
        String sql = "SELECT * FROM chatbot_faq ORDER BY id ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ChatbotFaq.class));
    }
}
