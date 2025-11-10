package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.entity.travel.TravelFood;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.entity.travel.TravelHotel;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.entity.travel.TravelRepair;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import com.springboot.bicycle_app.repository.TravelRepository;
import com.springboot.bicycle_app.jpa_repository.JpaTravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TravelServiceImpl implements TravelService{
    private TravelRepository travelRepository;
    private final JpaTravelRepository jpaTravelRepository;

    @Autowired
    public TravelServiceImpl(TravelRepository travelRepository,
                             JpaTravelRepository jpaTravelRepository) {
        this.travelRepository = travelRepository;
        this.jpaTravelRepository = jpaTravelRepository;
    }

    @Override
    public List<TravelFoodDto> findFood(){
        // System.out.println("service ==> ");
        List<TravelFoodDto> flist = new ArrayList<>();
        List<TravelFood> list = jpaTravelRepository.findFood();
        list.forEach((travel_food) -> flist.add(new TravelFoodDto(travel_food)));
        return flist;
    }

    @Override
    public List<TravelHotelDto> findHotel(){
//      System.out.println("service findHotel ==> ");
        List<TravelHotelDto> hlist = new ArrayList<>();
        List<TravelHotel> list = jpaTravelRepository.findHotel();
        list.forEach((travel_hotel) -> hlist.add(new TravelHotelDto(travel_hotel)));
        return hlist;
    }

    @Override
    public List<TravelRepairDto> findRepair(){
//      System.out.println("service findHotel ==> ");
        List<TravelRepairDto> rlist = new ArrayList<>();
        List<TravelRepair> list = jpaTravelRepository.findRepair();
        list.forEach((travel_repair) -> rlist.add(new TravelRepairDto(travel_repair)));
        return rlist;
    }

    @Override
    public TravelFoodDetailDto findFoodDetail(int did){
//        System.out.println("service ==> ");
        TravelFoodDetail entity = jpaTravelRepository.findFoodDetail(did);
        return new TravelFoodDetailDto(entity);
    }
}
