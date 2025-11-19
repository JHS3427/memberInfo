// src/api/chatbot.js
import axios from "axios";

export const getChatbotResponse = async (userMessage) => {
  try {
    // 쿠키에서 CSRF 토큰 읽기
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    const response = await axios.post(
      "http://localhost:8080/api/chatbot",
      { message: userMessage },
      {
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken || "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return { reply: "죄송합니다 😢 서버 연결에 문제가 발생했습니다." };
  }
};
