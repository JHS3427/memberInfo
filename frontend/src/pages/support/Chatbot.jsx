import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatbotResponse } from "../../api/chatbot.js";

export function Chatbot({ onClose }) {
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);

  /** ✅ CSRF 토큰 가져오기 */
  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
  };

  /** ✅ 초기 메시지 + localStorage 유지 */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: `안녕하세요 😊 Bicycle-App 고객센터입니다.
다음과 같은 키워드를 입력하시면 빠르게 답변을 받을 수 있어요!
👉 예: '배송', '환불', 'A/S', '자료실', '회원가입'`,
          },
        ];
  });

  const [input, setInput] = useState(localStorage.getItem("chatInput") || "");
  const [loading, setLoading] = useState(false);

  /** 저장용 스크롤 */
  const [scrollPos, setScrollPos] = useState(
    Number(localStorage.getItem("chatScroll")) || 0
  );

  /** 메시지, 입력, 스크롤 저장 */
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => localStorage.setItem("chatInput", input), [input]);
  useEffect(() => localStorage.setItem("chatScroll", scrollPos), [scrollPos]);

  /** 닫기 */
  const handleClose = () => {
    if (chatBodyRef.current) {
      const pos = chatBodyRef.current.scrollTop;
      setScrollPos(pos);
      localStorage.setItem("chatScroll", pos);
    }
    onClose();
  };

  /** 초기화 */
  const handleReset = () => {
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("chatInput");
    localStorage.removeItem("chatScroll");
    setMessages([
      {
        sender: "bot",
        text: `안녕하세요 😊 Bicycle-App 고객센터입니다.
👉 예: '배송', '환불', 'A/S', '자료실', '회원가입'`,
      },
    ]);
    setInput("");
    setScrollPos(0);
  };

  /** 스크롤 복원 */
  useEffect(() => {
    if (chatBodyRef.current) {
      const savedPos = Number(localStorage.getItem("chatScroll")) || 0;
      chatBodyRef.current.scrollTo({ top: savedPos, behavior: "smooth" });
    }
  }, []);

  /** 새 메시지 추가 시 자동 스크롤 */
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  /** 메시지 전송 */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // CSRF 토큰 포함 요청
    const botRes = await getChatbotResponse(input, getCsrfToken());

    const botMsg = {
      sender: "bot",
      text: botRes.reply,
      linkText: botRes.linkText,
      linkUrl: botRes.linkUrl,
    };

    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  /** URL 이동 처리 함수 (중복 제거) */
  const goToLink = (url) => {
    const finalUrl = url.startsWith("/") ? url : `/${url}`;
    navigate(finalUrl);
  };

  return (
    <div className="chatbot-popup">
      <div className="chatbot-window">
        {/* ---------- 헤더 ---------- */}
        <div className="chatbot-header">
          <h4>고객센터 챗봇</h4>

          <div className="chatbot-header-buttons">
            <button className="refresh-btn" onClick={handleReset}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button className="close-btn" onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* ---------- 본문 ---------- */}
        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-msg ${msg.sender}`}>
              <p>{msg.text}</p>

              {/* 🔥 링크 버튼 */}
              {msg.linkText && msg.linkUrl && (
                <div className="chatbot-links">
                  {msg.linkUrl.split(",").map((url, i) => {
                    const texts = msg.linkText.split(",");
                    const text = texts[i] || texts[0];

                    return (
                      <button
                        key={i}
                        className="chatbot-link-btn"
                        onClick={() => goToLink(url.trim())}
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="chat-msg bot loading">
              ⌛ 답변을 작성 중입니다...
            </div>
          )}
        </div>

        {/* ---------- 입력창 ---------- */}
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button onClick={handleSend} disabled={loading}>
            {loading ? "응답 중" : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
}
