import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { getCurrentUser, getLoginUser } from "../../feature/auth/session";
import "../../styles/board.css";
import "../../styles/board/board_write.css";

export function BoardWrite() {
  const { category, pid } = useParams();
  const navigate = useNavigate();
  const isEdit = !!pid;
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const local = getLoginUser();

    // 1) 로그인 안됨 → 바로 차단
    if (!local) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    // 2) URL 직접 접근 차단
    if (!location.state?.fromBoard) {
      alert("잘못된 접근입니다.");
      navigate("/board/news");
      return;
    }

    // 3) 백엔드 세션 인증 확인
    getCurrentUser().then((sessionUser) => {
      if (!sessionUser?.isLogin) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }
      setUser(sessionUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setForm(s => ({
        ...s,
        uid: user.uid,      // ⭐ DB FK로 저장될 uid
        writer: user.uid    // 화면 표시용
      }));
    }
  }, [user]);

  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
  };

  const [form, setForm] = useState({
    title: "",
    content: "",
    uid: "",          // 추가!
    writer: "",
    imageUrl: "",
    thumbnailUrl: "",
    categoryTag: category || "review",
    status: "PUBLIC",
  });

  // 파일 업로드 (썸네일 / 본문 이미지)
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://172.16.250.24:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-XSRF-TOKEN": getCsrfToken(),
          },
          withCredentials: true, // 🔥 중요: CSRF 쿠키 포함!
        }
      );

      const fileUrl = res.data.url; // 백엔드에서 반환한 이미지 URL

      setForm((s) => ({
        ...s,
        [type]: fileUrl,
      }));
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("이미지 업로드 중 오류 발생");
    }
  };

  // 기존 데이터 불러오기
  useEffect(() => {
    if (!isEdit) return;

    axios
      .get(`http://172.16.250.24:8080/api/board/detail/${pid}`, {
        withCredentials: true, // 🔥 쿠키 필요
      })
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title,
          content: p.content,
          uid: p.uid,
          writer: p.writer || user?.uid,
          imageUrl: p.imageUrl,
          thumbnailUrl: p.thumbnailUrl,
          categoryTag: p.categoryTag,
          status: p.status,
        });
      })
      .catch(console.error);
  }, [isEdit, pid, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrf = getCsrfToken();

      if (isEdit) {
        // 🔥 게시글 수정
        await axios.put(
          `http://172.16.250.24:8080/api/board/update/${pid}`,
          { ...form, uid: user.uid },   // ★ 추가 보강 (중복확인)
          {
            headers: { "X-XSRF-TOKEN": csrf },
            withCredentials: true,
          }
        );

        alert("수정되었습니다.");
        navigate(`/board/detail/${pid}`);
      } else {
        // 🔥 게시글 등록
        await axios.post(
          "http://172.16.250.24:8080/api/board/write",
          {
            ...form,
            uid: user.uid,         // FK
            writer: user.uid,      // 화면 표시용
            boardCategory: { bname: form.categoryTag },
          },
          { headers: { "X-XSRF-TOKEN": csrf }, withCredentials: true }
        );

        alert("게시글이 등록되었습니다!");
        navigate(`/board/${form.categoryTag}`);
      }
    } catch (err) {
      console.error(err);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="board-page">
      <h1 className="board-title">{isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <form className="board-write-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          value={form.content}
          onChange={handleChange}
          required
        />

        {/* 썸네일 업로드 */}
        <label className="upload-label">썸네일 이미지 첨부</label>
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "thumbnailUrl")}
          />
          <span>클릭하여 이미지 선택</span>
        </label>

        {/* 썸네일 미리보기 + 삭제 버튼 */}
        {form.thumbnailUrl && (
          <div className="preview-container">
            <img
              src={form.thumbnailUrl}
              alt="thumbnail preview"
              className="preview-img"
            />
            <button
              type="button"
              className="delete-image-btn"
              onClick={() => setForm((s) => ({ ...s, thumbnailUrl: "" }))}
            >
              ✕
            </button>
          </div>
        )}

        {/* 본문 이미지 업로드 */}
        <label className="upload-label">본문 이미지 첨부</label>
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "imageUrl")}
          />
          <span>클릭하여 이미지 선택</span>
        </label>

        {/* 본문 이미지 미리보기 + 삭제 버튼 */}
        {form.imageUrl && (
          <div className="preview-container">
            <img
              src={form.imageUrl}
              alt="content preview"
              className="preview-img"
            />
            <button
              type="button"
              className="delete-image-btn"
              onClick={() => setForm((s) => ({ ...s, imageUrl: "" }))}
            >
              ✕
            </button>
          </div>
        )}

        <select name="categoryTag" value={form.categoryTag} onChange={handleChange}>
          <option value="news">뉴스</option>
          <option value="event">이벤트</option>
          <option value="review">리뷰</option>
        </select>

        <button type="submit" className="btn-back">
          {isEdit ? "수정하기" : "등록"}
        </button>
      </form>
    </div>
  );
}
