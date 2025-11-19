package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.entity.board.BoardPost;
import java.util.List;
import java.util.Optional;

public interface BoardService {
    List<BoardPost> getPostList(String categoryName);
    Optional<BoardPost> getPostDetail(int pid);
    BoardPost savePost(BoardPost post);
    void deletePost(int pid);
    void increaseViewCount(int pid);
}
