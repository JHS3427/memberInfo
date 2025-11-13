//package com.springboot.bicycle_app.controller;
//
//import com.springboot.bicycle_app.dto.PaymentResponse;
//import com.springboot.bicycle_app.dto.RentalPaymentRequest;
//import com.springboot.bicycle_app.service.RentalService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/rental")
//@RequiredArgsConstructor
//@Slf4j
//public class RentalController {
//    private final RentalService rentalService;
//
//    @PostMapping("/checkout")
//    public ResponseEntity<PaymentResponse> checkout(@RequestBody RentalPaymentRequest request){
//        log.info("결제 요청 수신. 사용자 ID: {}, 금액:{}", request.getUserId(), request.getPaymentAmount());
//
//        try {
//            PaymentResponse response = rentalService.preparePayment(request);
//            log.info("결제 준비 성공. QR URL 반환{}", response.getQrCodeUrl());
//
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            log.error("결제 준비 중 오류 발생:", e);
//
//            return ResponseEntity.badRequest().build();
//        }
//    }
//
//}
