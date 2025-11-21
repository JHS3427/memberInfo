import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardList } from "./board/BoardList.jsx";
import { getLoginUser } from "../feature/auth/session";
import "../styles/board.css";

export function Board() {
  const { category } = useParams(); // news, event, review
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  // 로그인 사용자 로드
  useEffect(() => {
    setUser(getLoginUser());
  }, []);

  // 🔥 관리자 여부 체크
  const isAdmin = user?.role?.some((r) => r.authority === "ROLE_ADMIN");

  // 🔥 글 작성 가능 조건
  const canWrite =
    // 리뷰는 모든 로그인 유저 가능
    (category === "review" && user) ||
    // 뉴스/이벤트는 관리자만 가능
    ((category === "news" || category === "event") && isAdmin);

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

      {/* 글 작성 버튼 (로그인 한 경우에만 노출) */}
      {user ? (
        canWrite ? (
          <div className="detail-footer">
            <button
              className="btn-back"
              onClick={() =>
                navigate(`/board/write/${category}`, {
                  state: { fromBoard: true },
                })
              }
            >
              글 작성하기
            </button>
          </div>
        ) : (
          // 로그인했지만 작성 권한이 없는 경우
          <p style={{ textAlign: "center", marginTop: "20px", color: "#777" }}>
            ※ 이 게시판은 관리자만 글을 작성할 수 있습니다.
          </p>
        )
      ) : (
        // 비로그인 유저
        <p style={{ textAlign: "center", marginTop: "20px", color: "#777" }}>
          ※ 로그인 후 글 작성이 가능합니다.
        </p>
      )}
    </div>
  );
}
