package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class JdbcTemplateRentalRepository implements RentalRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTemplateRentalRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public String saveRental(RentalPaymentRequest request) {

        final String sql = "insert into rental_history (user_id, station_name, station_id, amount, method, start_time) VALUES (?, ?, ?, ?, ?, NOW())";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                // 1. user_id (VARCHAR - 공식적인 FK)
                ps.setString(1, request.getUserId());

                // 2. station_name (VARCAR)
                ps.setString(2, request.getStationName());

                // 3. station_id (VARCHAR)
                ps.setString(3, request.getStationId());

                // 4. amount (BIGINT)
                ps.setLong(4, request.getPaymentAmount());

                // 5. method (VARCHAR)
                ps.setString(5, request.getPaymentMethod());

                return ps;
            }, keyHolder);

        } catch (DataAccessException e) {
            System.err.println("🚨 CRITICAL DB INSERTION ERROR 🚨");
            System.err.println("Exception: " + e.getMessage());
            if(e.getRootCause() != null) {
                System.err.println("Root Cause: " + e.getRootCause().getMessage());
            }
            return null;
        }

        return keyHolder.getKey() != null ? keyHolder.getKey().toString() : null;
    }
}