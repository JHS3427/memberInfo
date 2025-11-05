package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.Travel;

import java.util.List;

public interface TravelRepository {
    List<Travel> findFood();
}
