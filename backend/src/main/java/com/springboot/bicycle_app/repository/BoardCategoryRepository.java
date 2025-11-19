package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.board.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory, Integer> {
    BoardCategory findByBname(String bname);
}
