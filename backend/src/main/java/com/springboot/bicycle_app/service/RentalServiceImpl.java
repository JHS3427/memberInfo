package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.RentalPayment;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RentalServiceImpl implements RentalService{

    private final RentalRepository rentalRepository;

    @Autowired
    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    @Transactional
    @Override
    public RentalPayment processPayment(RentalPaymentRequest request) {

        // DB 저장 로직 수행
        String generatedId = rentalRepository.saveRental(request);

        if(generatedId == null){
            return new RentalPayment("FAILURE", "대여 기록 저장에 실패했습니다.", null);
        }

        return new RentalPayment("SUCCESS", "자전거 대여 및 결제가 완료되었습니다.", generatedId);
    }
}