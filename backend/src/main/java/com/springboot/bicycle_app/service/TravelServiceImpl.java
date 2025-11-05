package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.Travel;
import com.springboot.bicycle_app.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TravelServiceImpl implements TravelService{
    private TravelRepository travelRepository;

    @Autowired
    public TravelServiceImpl(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }

    @Override
    public List<Travel> findFood(){
        System.out.println("service ==> ");
        List<Travel> list = travelRepository.findFood();
        return list;
    }
}
