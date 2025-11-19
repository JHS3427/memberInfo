package com.springboot.bicycle_app.dto;

import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.entity.board.BoardPost.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardPostDto {
    private int pid;
    private String uid;
    private String title;
    private String content;
    private String writer; // BoardPost에도 동일 이름으로 있어야 함
    private String categoryTag;
    private String imageUrl;
    private String thumbnailUrl;
    private Status status; // enum 타입
    private int viewCount;
    private LocalDateTime createdAt;

    public static BoardPostDto fromEntity(BoardPost post) {
        BoardPostDto dto = new BoardPostDto();
        dto.setPid(post.getPid());
        dto.setUid(post.getUid());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setWriter(post.getWriter());
        dto.setCategoryTag(post.getCategoryTag());
        dto.setImageUrl(post.getImageUrl());
        dto.setThumbnailUrl(post.getThumbnailUrl());
        dto.setStatus(post.getStatus());
        dto.setViewCount(post.getViewCount());
        dto.setCreatedAt(post.getCreatedAt());
        return dto;
    }

    public static BoardPost toEntity(BoardPostDto dto) {
        BoardPost post = new BoardPost();
        post.setPid(dto.getPid());
        post.setUid(dto.getUid());
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setWriter(dto.getWriter());
        post.setCategoryTag(dto.getCategoryTag());
        post.setImageUrl(dto.getImageUrl());
        post.setThumbnailUrl(dto.getThumbnailUrl());
        post.setStatus(dto.getStatus());
        post.setViewCount(dto.getViewCount());
        post.setCreatedAt(dto.getCreatedAt());
        return post;
    }
}
