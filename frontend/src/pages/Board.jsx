import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardList } from "./board/BoardList.jsx";
import "../styles/board.css";

export function Board() {
  const { category } = useParams(); // news, event, review
  const navigate = useNavigate();

  // 탭 목록 정의
  const tabs = [
    { key: "news", label: "뉴스" },
    { key: "event", label: "이벤트" },
    { key: "review", label: "리뷰" },
  ];

  const tabKeys = tabs.map((t) => t.key);

  // ❌ 잘못된 URL이면 강제 이동
  useEffect(() => {
    if (!tabKeys.includes(category)) {
      navigate("/board/news", { replace: true });
    }
  }, [category, navigate]);

  return (
    <div className="board-page">
      <h1 className="board-title">게시판</h1>

      {/* 탭 메뉴 */}
      <div className="board-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={category === tab.key ? "active" : ""}
            onClick={() => navigate(`/board/${tab.key}`)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 목록 출력 */}
      <BoardList category={category} />

      {/* 글 작성 */}
      <div className="detail-footer">
        <button
          className="btn-back"
          onClick={() => navigate(`/board/write/${category}`)}
        >
          글 작성하기
        </button>
      </div>
    </div>
  );
}
