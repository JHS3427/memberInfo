package com.springboot.bicycle_app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bicycle_app.dto.BoardJsonDto;
import com.springboot.bicycle_app.entity.board.BoardCategory;
import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.repository.BoardCategoryRepository;
import com.springboot.bicycle_app.repository.BoardPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardInitService {

    private final BoardPostRepository boardPostRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void loadInitialBoardData() {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

            // 🔥 board 폴더 안의 모든 JSON 스캔
            Resource[] resources = resolver.getResources("classpath:data/board/*.json");

            for (Resource resource : resources) {
                log.info("📥 Loading JSON: {}", resource.getFilename());

                List<BoardJsonDto> list = objectMapper.readValue(
                        resource.getInputStream(),
                        new TypeReference<List<BoardJsonDto>>() {}
                );

                for (BoardJsonDto dto : list) {

                    // 🔥 제목 중복되면 skip
                    if (boardPostRepository.existsByTitle(dto.getTitle())) {
                        log.info("⏩ 이미 존재하는 게시글 SKIP: {}", dto.getTitle());
                        continue;
                    }

                    BoardCategory category = boardCategoryRepository.findByBname(dto.getCategoryTag());
                    if (category == null) {
                        log.warn("❌ Category '{}' not found. JSON 생략됨", dto.getCategoryTag());
                        continue;
                    }

                    // 🔥 엔티티 생성
                    BoardPost post = new BoardPost();
                    post.setBoardCategory(category);
                    post.setUid(dto.getUid());
                    post.setWriter(dto.getWriter());
                    post.setTitle(dto.getTitle());
                    post.setContent(dto.getContent());
                    post.setImageUrl(dto.getImageUrl());
                    post.setThumbnailUrl(dto.getThumbnailUrl());
                    post.setCategoryTag(dto.getCategoryTag());
                    post.setStatus(BoardPost.Status.valueOf(dto.getStatus()));
                    post.setViewCount(0);
                    post.setCreatedAt(LocalDateTime.now());
                    post.setUpdatedAt(LocalDateTime.now());

                    boardPostRepository.save(post);
                    log.info("✅ Insert 완료: {}", dto.getTitle());
                }
            }

            log.info("🎉 Board 초기 데이터 로딩 완료!");

        } catch (Exception e) {
            log.error("❌ Board JSON 로드 실패", e);
        }
    }
}
