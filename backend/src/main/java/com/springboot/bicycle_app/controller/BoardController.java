package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // ✅ 수정
public class BoardController {

    private final BoardService boardService;

    /**
     * ✅ 게시판별 목록 조회
     * 예: /api/board/news, /api/board/event, /api/board/review
     */
    @GetMapping("/{category}")
    public List<BoardPost> getPostList(@PathVariable("category") String category) {
        return boardService.getPostList(category);
    }

    /**
     * ✅ 게시글 상세 조회
     * 예: /api/board/detail/3
     */
    @GetMapping("/detail/{pid}")
    public Optional<BoardPost> getPostDetail(@PathVariable("pid") int pid) {
        boardService.increaseViewCount(pid); // 조회수 증가
        return boardService.getPostDetail(pid);
    }

    /**
     * ✅ 게시글 등록 (회원/관리자 전용)
     * 예: POST /api/board/write
     */
    @PostMapping("/write")
    public ResponseEntity<?> writePost(@RequestBody BoardPost post) {
        try {
            BoardPost saved = boardService.savePost(post);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace(); // ✅ 콘솔에 예외 전체 출력
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * ✅ 게시글 수정 (본인 또는 관리자만)
     * 예: PUT /api/board/update/3
     */
    @PutMapping("/update/{pid}")
    public BoardPost updatePost(@PathVariable("pid") int pid, @RequestBody BoardPost updatedPost) {
        Optional<BoardPost> existing = boardService.getPostDetail(pid);
        if (existing.isPresent()) {
            BoardPost post = existing.get();
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            post.setImageUrl(updatedPost.getImageUrl());
            post.setThumbnailUrl(updatedPost.getThumbnailUrl());
            post.setCategoryTag(updatedPost.getCategoryTag());
            post.setStatus(updatedPost.getStatus());
            return boardService.savePost(post);
        }
        throw new RuntimeException("해당 게시글이 존재하지 않습니다. pid=" + pid);
    }

    /**
     * ✅ 게시글 삭제 (관리자 또는 작성자)
     * 예: DELETE /api/board/delete/3
     */
    @DeleteMapping("/delete/{pid}")
    public String deletePost(@PathVariable("pid") int pid) {
        boardService.deletePost(pid);
        return "게시글이 삭제되었습니다. pid=" + pid;
    }
}
