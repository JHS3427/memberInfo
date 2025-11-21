import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = "http://localhost:8080";
const API_BASE = "http://172.16.250.24:8080";   //해성님 IP

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
