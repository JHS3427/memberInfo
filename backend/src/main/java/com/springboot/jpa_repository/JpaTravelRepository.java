package com.springboot.bicycle_app.jpa_repository;

import com.springboot.bicycle_app.entity.travel.TravelFood;
import com.springboot.bicycle_app.entity.travel.TravelHotel;
import com.springboot.bicycle_app.entity.travel.TravelRepair;
import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import com.springboot.bicycle_app.entity.travel.TravelHotelDetail;
import com.springboot.bicycle_app.entity.travel.TravelRepairDetail;
import com.springboot.bicycle_app.entity.travel.TravelSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

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

    @Query("select d from TravelHotelDetail d where d.did = :did")
    TravelHotelDetail findHotelDetail(@Param("did") int did);

    @Query("select d from TravelRepairDetail d where d.did = :did")
    TravelRepairDetail findRepairDetail(@Param("did") int did);

    @Modifying
    @Transactional
    @Query(
            value = "INSERT INTO travel_save (uid, fid, hid, rid) VALUES (:uid, '[]', '[]', '[]')",
            nativeQuery = true
    )
    int insertSave(@Param("uid") String uid);


    @Query("select s from TravelSave s where s.uid = :uid")
    TravelSave findSave(@Param("uid") String uid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.fid = :fid where s.uid = :uid")
    int updateFoodSave(@Param("uid") String uid, @Param("fid") String fid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.hid = :hid where s.uid = :uid")
    int updateHotelSave(@Param("uid") String uid, @Param("hid") String hid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.rid = :rid where s.uid = :uid")
    int updateRepairSave(@Param("uid") String uid, @Param("rid") String rid);
}
