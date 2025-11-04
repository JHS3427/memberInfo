package com.springboot.bicycle_app.dto;

import lombok.Data;

@Data
public class Map {
//    "lat": 33.450701,
//    "lng": 126.570667,
//    "type": "coord"
    private String mname;
    private double lat;
    private double lng;
    private String type;
}
