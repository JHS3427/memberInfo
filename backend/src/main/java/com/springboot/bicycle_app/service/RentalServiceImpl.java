//package com.springboot.bicycle_app.service;
//
//import com.springboot.bicycle_app.dto.PaymentResponse;
//import com.springboot.bicycle_app.dto.RentalPayment;
//import com.springboot.bicycle_app.dto.RentalPaymentRequest;
//import com.springboot.bicycle_app.repository.RentalRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//    @Service
//    @RequiredArgsConstructor
//public class RentalServiceImpl implements RentalService {
//        private final RentalRepository rentalRepository;
//
//        @Override
//        public PaymentResponse preparePayment(RentalPaymentRequest request) {
//            RentalPayment payment = RentalPayment.from(request);
//
//            Long paymentId = rentalRepository.save(payment);
//            String transactionId = "TID_" + System.currentTimeMillis();
//
//
//            rentalRepository.updatePaymentAfterReady(paymentId, transactionId, "READY");
//
//            return PaymentResponse.builder()
//                    .qrCodeUrl((String) response.get("qr_code_url")) // QR 이미지 URL
//                    .redirectUrl("http://localhost:8080/api/rental/success?id=" + paymentId) // 결제 완료 후 최종 리다이렉트 URL
//                    .build();
//        }
//}
