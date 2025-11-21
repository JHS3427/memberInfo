package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.RentalPayment;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;

public interface RentalService {
    RentalPayment processPayment(RentalPaymentRequest request);
}