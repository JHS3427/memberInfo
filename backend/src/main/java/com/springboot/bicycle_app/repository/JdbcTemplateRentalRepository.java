package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.RentalPayment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class JdbcTemplateRentalRepository implements RentalRepository {

    private final NamedParameterJdbcTemplate namedJdbcTemplate;

    // 생성자 주입을 통해 JdbcTemplate을 받음.
    public JdbcTemplateRentalRepository(JdbcTemplate jdbcTemplate) {
        this.namedJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
    }

    @Override
    public Long save(RentalPayment payment) {
        final String sql = "INSERT INTO rental_payment " +
                "(payment_amount, user_id, station_id, station_name, payment_method, payment_status, created_at) " +
                "VALUES (:paymentAmount, :userId, :stationId, :stationName, :paymentMethod, :paymentStatus, :createdAt)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        // BeanPropertySqlParameterSource를 사용해 Model의 필드를 SQL 파라미터로 매핑

        namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(payment), keyHolder, new String[]{"id"});

        // 생성된 PK를 반환합니다. (결제사 요청 시 DB ID가 필요)
        return keyHolder.getKey().longValue();
    }

    // 다른 메서드들은 복잡하므로 여기서는 생략하고, 가장 중요한 save만 구현
    // findById, updatePaymentStatus 등의 메서드를 구현

    @Override
    public Optional<RentalPayment> findById(Long id) {
        // (조회 로직 구현)
        return Optional.empty(); // 더미 반환
    }

    @Override
    public int updatePaymentAfterReady(Long id, String transactionId, String status) {
        // (업데이트 로직 구현)
        return 1; // 더미 반환
    }
}
