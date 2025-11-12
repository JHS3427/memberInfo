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
// business	json
// phone	varchar(100)
// other	json
// menu	    json
// mainImages	json
// imageList	json
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

    @Column(name="business", columnDefinition = "JSON")
    private String business;

    @Column(name="phone", length = 100)
    private String phone;

    @Column(name="other", columnDefinition = "JSON")
    private String other;

    @Column(name="menu", columnDefinition = "JSON")
    private String menu;

    @Column(name="mainImages", columnDefinition = "JSON")
    private String mainImages;

    @Column(name="imageList", columnDefinition = "JSON")
    private String imageList;

    @Column(name="review", columnDefinition = "JSON")
    private String review;
}