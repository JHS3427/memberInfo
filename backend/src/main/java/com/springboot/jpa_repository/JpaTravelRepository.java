package com.springboot.bicycle_app.jpa_repository;

import com.springboot.bicycle_app.entity.travel.TravelFood;
import com.springboot.bicycle_app.entity.travel.TravelHotel;
import com.springboot.bicycle_app.entity.travel.TravelRepair;
import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaTravelRepository extends JpaRepository<TravelFood, Integer> {

    @Query("select f from TravelFood f")
    List<TravelFood> findFood();

    @Query("select h from TravelHotel h")
    List<TravelHotel> findHotel();

    @Query("select r from TravelRepair r")
    List<TravelRepair> findRepair();

    @Query("select d from TravelFoodDetail d where d.did = :did")
    TravelFoodDetail findFoodDetail(@Param("did") int did);
}
