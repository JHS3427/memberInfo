import axios from "axios";

// 백엔드(Spring Security 세션)로부터 현재 로그인한 사용자 정보를 가져오는 비동기 함수
export const getCurrentUser = async () => {
  try {
    const res = await axios.get("http://localhost:8080/auth/me", {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return { isLogin: false };
  }
};

// 현재 로그인한 사용자가 관리자(Admin) 권한인지 확인하는 함수
export const isAdmin = (user) =>
  user?.role?.some((r) => r.authority === "ROLE_ADMIN");

// 현재 로그인한 사용자(user)가 게시글(post)을 쓴 작성자 본인인지 확인하는 함수
export const isOwner = (user, post) =>
  user?.unum && post?.unum && user.unum === post.unum;

// CSRF 토큰 꺼내는 함수
export const getCsrfToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
};