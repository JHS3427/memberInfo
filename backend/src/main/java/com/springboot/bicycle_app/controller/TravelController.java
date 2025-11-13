package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;
import com.springboot.bicycle_app.service.TravelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel")
public class TravelController {
    private TravelService travelService;

    @Autowired
    public TravelController(TravelService travelService) {
        this.travelService = travelService;
    }

    @GetMapping("/food")
    public List<TravelFoodDto> food(){
        // System.out.println("controller ==> ");
        return travelService.findFood();
    }

    @GetMapping("/hotel")
    public List<TravelHotelDto> hotel(){
//         System.out.println("controller ==> ");
        return travelService.findHotel();
    }

    @GetMapping("/repair")
    public List<TravelRepairDto> repair(){
        // System.out.println("controller ==> ");
        return travelService.findRepair();
    }

    @PostMapping("/foodDetail")
    public TravelFoodDetailDto foodDetail(@RequestBody TravelFoodDetailDto travelFoodDetail){
//        System.out.println("controller ==> ");
        return travelService.findFoodDetail(travelFoodDetail.getDid());
    }

    @PostMapping("/hotelDetail")
    public TravelHotelDetailDto hotelDetail(@RequestBody TravelHotelDetailDto travelHotelDetail){
//        System.out.println("controller ==> ");
        return travelService.findHotelDetail(travelHotelDetail.getDid());
    }
}
