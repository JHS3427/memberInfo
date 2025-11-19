package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.entity.board.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BoardPostRepository extends JpaRepository<BoardPost, Integer> {

    // 최신 pid 순 정렬
    List<BoardPost> findByBoardCategoryAndStatusOrderByPidDesc(
            BoardCategory category,
            BoardPost.Status status
    );

    boolean existsByTitle(String title); // 제목 중복 체크
}
