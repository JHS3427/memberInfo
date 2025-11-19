package com.springboot.bicycle_app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString; // 디버깅을 위해 추가

// @Getter, @Setter 어노테이션을 통해 Lombok이 getter/setter 메서드를 자동 생성합니다.
@Getter
@Setter
@ToString
public class RentalPaymentRequest {

    // 프론트엔드의 calculatedPrice
    private int paymentAmount;

    // Redux Store의 auth.userId
    private String userId;

    // Redux Store의 rentalData.selectedStation 정보
    private String stationId;
    private String stationName;

    // 프론트에서 선택한 결제 수단 (kakaopay 또는 naverpay)
    private String paymentMethod;
}