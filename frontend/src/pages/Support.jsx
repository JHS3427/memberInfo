import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FAQ } from "./support/Faq.jsx";
import { ASInfo } from "./support/ASInfo.jsx";
import { Resources } from "./support/Resources.jsx";
import { Chatbot } from "./support/Chatbot.jsx";
import "../styles/support.css";

export function Support() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // URL에서 탭 추출 (기본값: faq)
  const tab = pathname.split("/").pop() || "faq";

  const [showChatbot, setShowChatbot] = useState(false);

  // ✅ 챗봇 열기 함수
  const openChatbot = () => {
    setShowChatbot(true);
    // 🔵 전역 이벤트 발생
    window.dispatchEvent(new CustomEvent("chatbotToggle", { detail: true }));
  };

  // ✅ 챗봇 닫기 함수
  const closeChatbot = () => {
    setShowChatbot(false);
    // 🔵 전역 이벤트 발생
    window.dispatchEvent(new CustomEvent("chatbotToggle", { detail: false }));
  };

  return (
    <div className="support-page">
      <h1 className="support-title">고객센터</h1>

      {/* 탭 네비게이션 */}
      <div className="support-tabs">
        <button
          className={tab === "faq" ? "active" : ""}
          onClick={() => navigate("/support/faq")}
        >
          자주 묻는 질문
        </button>
        <button
          className={tab === "asinfo" ? "active" : ""}
          onClick={() => navigate("/support/asinfo")}
        >
          A/S 안내
        </button>
        <button
          className={tab === "resources" ? "active" : ""}
          onClick={() => navigate("/support/resources")}
        >
          자료실
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {tab === "faq" && <FAQ />}
        {tab === "asinfo" && <ASInfo />}
        {tab === "resources" && <Resources />}
      </div>

      {/* 고객센터 안내 */}
      <div className="support-contact">
        <p className="support-label">고객센터</p>
        <h2>02-1234-5678</h2>
        <p>평일 오전 9시 ~ 오후 6시</p>
        <p>토요일, 일요일, 공휴일 휴무</p>
        <div className="support-buttons">
           <button onClick={openChatbot}>챗봇 상담</button>
        </div>
      </div>

      {/* Chatbot 팝업 */}
      {showChatbot && <Chatbot onClose={closeChatbot} />}
    </div>
  );
}
