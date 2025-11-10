import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatbotResponse } from "../../api/chatbot.js";

export function Chatbot({ onClose }) {
    const navigate = useNavigate();
    const chatBodyRef = useRef(null);

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
    const [scrollPos, setScrollPos] = useState(
        Number(localStorage.getItem("chatScroll")) || 0
    );

    // ✅ 메시지, 입력, 스크롤 저장
    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => localStorage.setItem("chatInput", input), [input]);
    useEffect(() => localStorage.setItem("chatScroll", scrollPos), [scrollPos]);

    // ✅ 챗봇 닫기
    const handleClose = () => {
        if (chatBodyRef.current) {
        const pos = chatBodyRef.current.scrollTop;
        setScrollPos(pos);
        localStorage.setItem("chatScroll", pos);
        }
        onClose();
    };

    // ✅ 챗봇 초기화
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

    // ✅ 스크롤 복원
    useEffect(() => {
        if (chatBodyRef.current) {
        const savedPos = Number(localStorage.getItem("chatScroll")) || 0;
        chatBodyRef.current.scrollTo({ top: savedPos, behavior: "smooth" });
        }
    }, []);

    // ✅ 메시지 추가 시 자동 스크롤
    useEffect(() => {
        if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    // ✅ 메시지 전송
    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        const botResponse = await getChatbotResponse(input);
        const botMessage = {
        sender: "bot",
        text: botResponse.reply,
        linkText: botResponse.linkText,
        linkUrl: botResponse.linkUrl,
        };

        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
    };

    return (
        <div className="chatbot-popup">
        <div className="chatbot-window">
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

            <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.sender}`}>
                <p>{msg.text}</p>

                {/* 여러 개의 링크 버튼 */}
                {msg.linkText &&
                    msg.linkUrl &&
                    (() => {
                    const urls = msg.linkUrl.split(",").map((u) => u.trim());
                    const texts = msg.linkText.split(",").map((t) => t.trim());
                    const displayTexts =
                        texts.length === urls.length
                        ? texts
                        : Array(urls.length).fill(texts[0]);

                    return (
                        <div className="chatbot-links">
                        {urls.map((url, i) => {
                            if (url.startsWith("support:")) {
                            const tab = url.split(":")[1];
                            return (
                                <button
                                key={i}
                                className="chatbot-link-btn"
                                onClick={() =>
                                    navigate("/support", {
                                    state: { tab },
                                    replace: true,
                                    })
                                }
                                >
                                {displayTexts[i]}
                                </button>
                            );
                            } else {
                            return (
                                <a
                                key={i}
                                href={url.startsWith("/") ? url : `/${url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chatbot-link-btn"
                                >
                                {displayTexts[i]}
                                </a>
                            );
                            }
                        })}
                        </div>
                    );
                    })()}
                </div>
            ))}

            {loading && (
                <div className="chat-msg bot loading">⌛ 답변을 작성 중입니다...</div>
            )}
            </div>

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
