import axios from "axios";
import { getApiBase } from "../feature/auth/getApiBase.js";

const API_BASE = getApiBase();

export const getChatbotResponse = async (userMessage) => {
  try {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    const response = await axios.post(
      `${API_BASE}/api/chatbot`,
      { message: userMessage },
      {
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken || "",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return { reply: "죄송합니다 😢 서버 연결에 문제가 발생했습니다." };
  }
};
