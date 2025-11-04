// src/api/chatbot.js
import axios from "axios";

export const getChatbotResponse = async (userMessage) => {
  try {
    const response = await axios.post("http://localhost:8080/api/chatbot", {
      message: userMessage,
    });
    // ✅ reply, linkText, linkUrl 전부 반환
    return response.data;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return { reply: "죄송합니다 😢 서버 연결에 문제가 발생했습니다." };
  }
};
