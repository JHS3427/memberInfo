package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="travel_food_detail")
@Getter
@Setter
public class TravelFoodDetail {
// did	int
// fname	varchar(30)
// flike	decimal(4,1)
// tag	    json
// location	varchar(100)
// food	varchar(100)
// address	varchar(100)
// local_address	varchar(100)
// business_houers	varchar(100)
// last_order	varchar(100)
// phone	varchar(100)
// other	json
// menu	    json
// image1	varchar(100)
// image2	varchar(100)
// image3	varchar(100)
// review	json
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;

    @Column(name="fname", length = 30, nullable = false)
    private String fname;

    @Column(name="flike") 
    private Double flike; 

    @Column(name="tag", columnDefinition = "JSON")
    private String tag;

    @Column(name="location", length = 100)
    private String location;

    @Column(name="food", length = 100)
    private String food;

    @Column(name="address", length = 100)
    private String address;

    @Column(name="localAddress", length = 100)
    private String localAddress;

    @Column(name="businessHouers", length = 100)
    private String businessHouers;

    @Column(name="lastOrder", length = 100)
    private String lastOrder;

    @Column(name="phone", length = 100)
    private String phone;

    @Column(name="other", columnDefinition = "JSON")
    private String other;

    @Column(name="menu", columnDefinition = "JSON")
    private String menu;

    @Column(name="image1", length = 100)
    private String image1;

    @Column(name="image2", length = 100)
    private String image2;

    @Column(name="image3", length = 100)
    private String image3;

    @Column(name="review", columnDefinition = "JSON")
    private String review;
}