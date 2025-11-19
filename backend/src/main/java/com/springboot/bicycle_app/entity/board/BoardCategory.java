package com.springboot.bicycle_app.entity.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "board_category")
@Getter @Setter
public class BoardCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bid;

    @Column(nullable = false, length = 50)
    private String bname;   // news, event, review

    @Column(nullable = false, length = 100)
    private String btitle;  // 뉴스, 이벤트, 리뷰
}
