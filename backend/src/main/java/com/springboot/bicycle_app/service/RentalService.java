package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.PaymentResponse;

public interface RentalService {
    PaymentResponse preparePayment(RentalPaymentRequest request);
}
