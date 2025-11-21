package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDetailDto;
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
        return travelService.findFood();
    }

    @GetMapping("/hotel")
    public List<TravelHotelDto> hotel(){
        return travelService.findHotel();
    }

    @GetMapping("/repair")
    public List<TravelRepairDto> repair(){
        return travelService.findRepair();
    }

//    @GetMapping("/store")
//    public List<TravelStoreDto> repair(){
//        return travelService.findStore();
//    }

    @PostMapping("/foodDetail")
    public TravelFoodDetailDto foodDetail(@RequestBody TravelFoodDetailDto travelFoodDetail){
        return travelService.findFoodDetail(travelFoodDetail.getDid());
    }

    @PostMapping("/hotelDetail")
    public TravelHotelDetailDto hotelDetail(@RequestBody TravelHotelDetailDto travelHotelDetail){
        return travelService.findHotelDetail(travelHotelDetail.getDid());
    }

    @PostMapping("/repairDetail")
    public TravelRepairDetailDto repairDetail(@RequestBody TravelRepairDetailDto travelRepairDetail){
        return travelService.findRepairDetail(travelRepairDetail.getDid());
    }
}
