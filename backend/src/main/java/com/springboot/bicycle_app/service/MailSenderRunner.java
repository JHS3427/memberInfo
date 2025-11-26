package com.springboot.bicycle_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;

@Component // Spring 빈으로 등록 (역할은 Service와 동일)
@RequiredArgsConstructor
public class MailSenderRunner { // ApplicationRunner 구현 제거

    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    @Value("${spring.mail.username}")
    private String senderEmail;



    /**
     * 외부에서 호출하여 테스트 메일을 발송하는 메서드
     */
    public void sendTestMail(String authcode) throws Exception {
        String encodedAuthCode = passwordEncoder.encode(authcode);
        System.out.println("메일 전송 시도: " + senderEmail + " -> jhs34276225@naver.com");

        MimeMessage m = mailSender.createMimeMessage();
        MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");

        h.setFrom(senderEmail);
        h.setTo("jhs34276225@naver.com");//나중에 이메일 주소 받아서 보내기
        h.setSubject("인증 코드 메일입니다.");
        h.setText("인증 코드는 다음과 같습니다 : " + encodedAuthCode);

        //DB 저장 부분

        //송신
        mailSender.send(m);
        System.out.println("메일 전송 완료!");
    }
}