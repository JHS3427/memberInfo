package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.RentalPayment;
import java.util.Optional;

public interface RentalRepository {
    Long save(RentalPayment payment);
    Optional<RentalPayment> findById(Long id);
    int updatePaymentAfterReady(Long id, String transactionId, String status);
}
