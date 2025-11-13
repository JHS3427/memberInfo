package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;

import java.util.List;

public interface TravelService {
    List<TravelFoodDto> findFood();
    List<TravelHotelDto> findHotel();
    List<TravelRepairDto> findRepair();
    TravelFoodDetailDto findFoodDetail(int did);
    TravelHotelDetailDto findHotelDetail(int did);
}
