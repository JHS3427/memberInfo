package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import lombok.Data;

import java.util.List;

@Data
public class TravelFoodDetailDto {
    private int did;
    private String fname;
    private Double flike;
    private String tag;
    private String location;
    private String food;
    private String address;
    private String localAddress;
    private String businessHouers;
    private String lastOrder;
    private String phone;
    private String other;
    private String menu;
    private String image1;
    private String image2;
    private String image3;
    private String review;

    //Entity <=> Dto 변환
    public TravelFoodDetailDto() {}
    public TravelFoodDetailDto(TravelFoodDetail entity) {
        this.did = entity.getDid();
        this.fname = entity.getFname();
        this.flike = entity.getFlike();
        this.tag = entity.getTag();
        this.location = entity.getLocation();
        this.food = entity.getFood();
        this.address = entity.getAddress();
        this.localAddress = entity.getLocalAddress();
        this.businessHouers = entity.getBusinessHouers();
        this.lastOrder = entity.getLastOrder();
        this.phone = entity.getPhone();
        this.other = entity.getOther();
        this.menu = entity.getMenu();
        this.image1 = entity.getImage1();
        this.image2 = entity.getImage2();
        this.image3 = entity.getImage3();
        this.review = entity.getReview();
    }
}
