package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;

public interface RentalRepository {
    String saveRental(RentalPaymentRequest request);
}