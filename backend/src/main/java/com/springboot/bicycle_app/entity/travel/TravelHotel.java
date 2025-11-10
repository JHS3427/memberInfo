package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="travel_hotel")
@Getter
@Setter
public class TravelHotel {
    // fid			int				auto_increment primary key,
    // fname   	varchar(30) not null,
    // flike		DECIMAL(4,1),
    // score	    int,
    // evaluation	int,
    // tag			json,  
    // image1		varchar(100),
    // image2		varchar(100),
    // image3		varchar(100),
    // fullImage1	varchar(100),
    // fullImage2	varchar(100),
    // fullImage3	varchar(100),
    // description	varchar(300)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hid;

    @Column(name="hname", length = 30, nullable = false)
    private String hname;

    @Column(name="hlike") 
    private Double hlike; 

    @Column(name="score")
    private int score;

    @Column(name="evaluation")
    private int evaluation;

    @Column(name="tag", columnDefinition = "JSON")
    private String tag;

    @Column(name="image1", length = 100)
    private String image1;

    @Column(name="image2", length = 100)
    private String image2;

    @Column(name="image3", length = 100)
    private String image3;

    @Column(name="fullImage1", length = 100)
    private String fullImage1;

    @Column(name="fullImage2", length = 100)
    private String fullImage2;

    @Column(name="fullImage3", length = 100)
    private String fullImage3;

    @Column(name="description", length = 300)
    private String description;
}