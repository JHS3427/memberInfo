import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/board.css";
import "../../styles/board/board_list.css";
import { Pagination } from "../../pages/support/Pagination.jsx";

export function BoardList({ category }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 8개
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) return;
    axios
      .get(`http://localhost:8080/api/board/${category}`)
      .then((res) => {
        setPosts(res.data);
        setCurrentPage(1); // 카테고리 변경 시 1페이지로 초기화
      })
      .catch((err) => console.error("게시글 목록 불러오기 실패:", err));
  }, [category]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="board-list">
      <div className="board-cards">
        {currentPosts.length === 0 ? (
          <p>등록된 게시글이 없습니다.</p>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post.pid}
              className="board-card"
              onClick={() =>
                navigate(`/board/detail/${post.pid}`, { state: { post } })
              }
            >
              <img
                src={post.thumbnailUrl || "/images/noimage.png"}
                alt={post.title}
                className="board-thumb"
              />
              <div className="board-info">
                <h3>{post.title}</h3>
                <p className="board-date">{post.createdAt?.slice(0, 10)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
