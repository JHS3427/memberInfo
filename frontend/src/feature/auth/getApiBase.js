// src/utils/getApiBase.js
export function getApiBase() {
  let API_BASE = null;

  try {
    const API_BASES = JSON.parse(process.env.REACT_APP_API_BASES);
    const hostname = window.location.hostname;

    // 1) hostname 기반 매칭
    API_BASE = API_BASES.find((url) => url.includes(hostname));

    // 2) 로컬 환경 강제 localhost
    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.");

    if (isLocal) {
      API_BASE = "http://localhost:8080";
    }

    // 3) fallback
    if (!API_BASE) {
      API_BASE = "http://localhost:8080";
    }
  } catch (e) {
    console.error("API_BASE 파싱 실패:", e);
    API_BASE = "http://localhost:8080";
  }

  return API_BASE;
}
