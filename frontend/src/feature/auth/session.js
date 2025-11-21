import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = "http://localhost:8080";
const API_BASE = "http://172.16.250.24:8080";   //해성님 IP

// 백엔드(Spring Security 세션)로부터 현재 로그인한 사용자 정보를 가져오는 비동기 함수
export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${API_BASE}/auth/me`, {
      withCredentials: true,
    });

    let user = res.data;

    // 🔥 userId → uid 로 통일
    if (!user.uid && user.userId) {
      user.uid = user.userId;
    }

    // 🔥 role 정보가 없으면 기본 세팅 (백엔드가 보내주지 않는 상황 대비)
    if (!user.role) {
      user.role = [];
    }

    // 🔥 관리자 계정(admin 또는 role 필드가 없는 관리자)
    if (
      (user.uid === "admin" || user.username === "admin") &&
      !user.role.some((r) => r.authority === "ROLE_ADMIN")
    ) {
      user.role.push({ authority: "ROLE_ADMIN" });
    }

    return user;
  } catch (err) {
    return { isLogin: false };
  }
};

// 현재 로그인한 사용자가 관리자(Admin) 권한인지 확인하는 함수
export const isAdmin = (user) =>
  user?.role?.some((r) => r.authority === "ROLE_ADMIN");

// 현재 로그인한 사용자(user)가 게시글(post)을 쓴 작성자 본인인지 확인하는 함수
export const isOwner = (user, post) =>
  user?.uid && post?.uid && user.uid === post.uid;

// CSRF 토큰 꺼내는 함수
export const getCsrfToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
};

// Local storage에 logininfo key 확인
export function getLoginUser() {
  const info = localStorage.getItem("loginInfo");
  const parsed = info ? JSON.parse(info) : null;

  if (!parsed) return null;

  // 🔥 userId → uid 보정
  if (!parsed.uid && parsed.userId) {
    parsed.uid = parsed.userId;
  }

  // 🔥 role 보정 (로컬스토리지에도 role이 없을 수 있음)
  if (!parsed.role) {
    parsed.role = [];
  }

  // 🔥 관리자 계정(role 자동 부여)
  if (
    (parsed.uid === "admin" || parsed.username === "admin") &&
    !parsed.role.some((r) => r.authority === "ROLE_ADMIN")
  ) {
    parsed.role.push({ authority: "ROLE_ADMIN" });
  }

  return parsed;
}
