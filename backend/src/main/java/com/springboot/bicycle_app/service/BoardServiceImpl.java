package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.entity.board.BoardCategory;
import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.repository.BoardCategoryRepository;
import com.springboot.bicycle_app.repository.BoardPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardPostRepository boardPostRepository;
    private final BoardCategoryRepository boardCategoryRepository;

    /**
     * 게시글 목록 조회
     */
    @Override
    public List<BoardPost> getPostList(String categoryName) {
        BoardCategory category = boardCategoryRepository.findByBname(categoryName);
        if (category == null) {
            throw new IllegalArgumentException("해당 게시판이 존재하지 않습니다: " + categoryName);
        }
        return boardPostRepository
            .findByBoardCategoryAndStatusOrderByPidDesc(category, BoardPost.Status.PUBLIC);

    }

    /**
     * 게시글 상세 조회
     */
    @Override
    public Optional<BoardPost> getPostDetail(int pid) {
        return boardPostRepository.findById(pid);
    }

    /**
     * 게시글 작성 또는 수정
     */
    @Override
    public BoardPost savePost(BoardPost post) {
        // ✅ 카테고리 연결 로직 추가
        if (post.getBoardCategory() != null && post.getBoardCategory().getBname() != null) {
            BoardCategory category = boardCategoryRepository.findByBname(post.getBoardCategory().getBname());
            if (category == null) {
                throw new IllegalArgumentException("해당 카테고리가 존재하지 않습니다: " + post.getBoardCategory().getBname());
            }
            post.setBoardCategory(category);
        }
        post.setUpdatedAt(java.time.LocalDateTime.now());
        return boardPostRepository.save(post);
    }

    /**
     * 게시글 삭제
     */
    @Override
    public void deletePost(int pid) {
        boardPostRepository.deleteById(pid);
    }

    /**
     * 조회수 증가
     */
    @Override
    public void increaseViewCount(int pid) {
        Optional<BoardPost> postOpt = boardPostRepository.findById(pid);
        if (postOpt.isPresent()) {
            BoardPost post = postOpt.get();
            post.setViewCount(post.getViewCount() + 1);
            boardPostRepository.save(post);
        }
    }
}
