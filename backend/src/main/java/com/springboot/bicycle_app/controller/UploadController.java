package com.springboot.bicycle_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UploadController {

    @PostMapping("/upload")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            // 원본 파일명 + 확장자
            String originalName = file.getOriginalFilename();
            String ext = originalName.substring(originalName.lastIndexOf(".")); // .jpg

            // UUID + 확장자로 안전한 파일명 생성
            String newFileName = UUID.randomUUID() + ext;

            // 실제 저장 경로
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            Path uploadPath = uploadDir.resolve(newFileName);

            // 🔥 중복 시 기존 파일을 덮어쓰기
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

            // URL 반환
            String fileUrl = "http://localhost:8080/uploads/" + newFileName;

            return Map.of("url", fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패", e);
        }
    }
}
