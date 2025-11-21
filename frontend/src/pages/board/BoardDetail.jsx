import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, isAdmin, isOwner, getCsrfToken } from "../../feature/auth/session";
import "../../styles/board.css";
import "../../styles/board/board_detail.css";

export function BoardDetail() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
      getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    axios
      .get(`http://172.16.250.24:8080/api/board/detail/${pid}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("게시글 상세 조회 실패:", err));
  }, [pid]);

  const canManage = isAdmin(user) || isOwner(user, post);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      const csrf = getCsrfToken();

      await axios.delete(
        `http://172.16.250.24:8080/api/board/delete/${pid}`,
        {
          headers: {
            "X-XSRF-TOKEN": csrf
          },
          withCredentials: true,
        }
      );

      alert("삭제되었습니다.");

      const backTab = post?.categoryTag || "news";
      navigate(`/board/${backTab}`);
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/board/edit/${pid}`, {
      state: { fromBoard: true }   // 🔥 반드시 필요!
    });
  };

  if (!post)
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>
        게시글을 불러오는 중입니다...
      </p>
    );

  return (
    <div className="board-detail">
      <h1 className="detail-title">{post.title}</h1>

      <div className="detail-meta">
        <span>작성자: {post.writer || "관리자"}</span>
        <span>{post.createdAt?.slice(0, 10)}</span>
        <span>조회수: {post.viewCount}</span>
      </div>

      <hr className="detail-divider" />

      {/* 🔥 이미지 출력 구역 */}
      <div className="detail-content">

        {/* 본문 이미지 */}
        {post.imageUrl && (
          <div className="detail-image-box">
            <img src={post.imageUrl} alt="본문 이미지" className="detail-image" />
          </div>
        )}

        {/* 본문 텍스트 */}
        <p className="detail-text">{post.content}</p>
      </div>

      <div className="detail-footer">
        <button className="btn-back" onClick={() => navigate(`/board/${post.categoryTag}`)}>
          목록으로
        </button>

        {canManage && (
          <>
            <button className="btn-back" onClick={handleEdit}>
              수정
            </button>
            <button className="btn-back" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}
