package com.springboot.bicycle_app.entity.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "board_post")
@Getter @Setter
public class BoardPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;

    @ManyToOne
    @JoinColumn(name = "bid")
    private BoardCategory boardCategory;

    @Column(nullable = false)
    private String uid; // ✅ 작성자 번호 (임시로 userId 대신)

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(length = 50)
    private String writer;

    @Column(length = 50)
    private String categoryTag;

    @Column
    private String imageUrl;

    @Column
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PUBLIC;

    @Column
    private int viewCount = 0;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum Status {
        PUBLIC, PRIVATE, DELETED
    }
}
