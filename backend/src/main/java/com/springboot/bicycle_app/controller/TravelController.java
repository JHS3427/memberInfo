package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.Travel;
import com.springboot.bicycle_app.service.TravelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

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
    public List<Travel> food(){
        System.out.println("controller ==> ");
        return travelService.findFood();
    }
}
