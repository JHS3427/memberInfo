import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHeadset, FaUser, FaBars, FaTimes, FaCartArrowDown, FaSignOutAlt } from "react-icons/fa";
import { Chatbot } from "../../pages/support/Chatbot.jsx";
import { useAuth } from "../../feature/auth/authContext.js";
import { getCsrfToken } from "../../feature/auth/session";
import "../../styles/purchaseheader.css";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [purchaseMenuOpen, setPurchaseMenuOpen] = useState(false);
    const [purchaseActive, setPurchaseActive] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
    const [closing, setClosing] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    // 화면 크기 감지
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1023);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // URL 기준으로만 purchaseActive 관리
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith("/products/") || path.startsWith("/compare")) {
            setPurchaseActive(true);
        } else {
            setPurchaseActive(false);
        }
    }, [location.pathname]);

    // PC에서 '자전거 구매' hover 시 서브메뉴 열기
    const handleMouseEnterPurchase = () => {
        if (!isMobile) {
            setPurchaseMenuOpen(true);
        }
    };

    // PC에서 header 밖으로 나가면 서브메뉴 닫기
    const handleMouseLeaveHeader = () => {
        if (!isMobile) {
            setPurchaseMenuOpen(false);
        }
    };

    // PC에서 다른 메뉴 hover 시 서브메뉴 닫기
    const handleMouseEnterOther = () => {
        if (!isMobile) {
            setPurchaseMenuOpen(false);
        }
    };

    // 모바일에서만 '자전거 구매' 클릭으로 열고 닫기
    const handleMobilePurchaseClick = () => {
        if (isMobile) {
            setPurchaseMenuOpen(prev => !prev);
        }
    };

    // 모바일 메뉴 닫기 + 슬라이드 애니메이션
    const closeMobileMenu = () => {
        if (!isMobile) return;

        setClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setPurchaseMenuOpen(false);
            setClosing(false);
        }, 300);
    };

    return (
        <>
            <header className="header" onMouseLeave={handleMouseLeaveHeader}>
                <div className="header-left">
                    <Link to="/" className="logo">Bicycle-App</Link>
                </div>

                <nav className={`header-center ${menuOpen ? (closing ? "closing" : "open") : ""}`}>
                    <ul>
                        {/* 자전거 구매 */}
                        <li
                            onMouseEnter={handleMouseEnterPurchase}
                            onClick={handleMobilePurchaseClick}
                        >
                            <span className={`menu-item ${purchaseActive ? "active" : ""}`}>
                                자전거 구매
                                {isMobile && (
                                    <span className="toggle-arrow">
                                        {purchaseMenuOpen ? " ▲" : " ▼"}
                                    </span>
                                )}
                            </span>

                            {/* 모바일 서브메뉴 */}
                            {isMobile && purchaseMenuOpen && (
                                <ul className="mobile-submenu">
                                    <li><Link to="/products/mountain" onClick={closeMobileMenu}>산악</Link></li>
                                    <li><Link to="/products/road" onClick={closeMobileMenu}>로드</Link></li>
                                    <li><Link to="/products/lifestyle" onClick={closeMobileMenu}>라이프스타일</Link></li>
                                    <li><Link to="/products/electric" onClick={closeMobileMenu}>전기</Link></li>
                                    <li><Link to="/compare" onClick={closeMobileMenu}>비교하기</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* 자전거 대여 */}
                        <li onMouseEnter={handleMouseEnterOther}>
                            <NavLink to="/rental" onClick={closeMobileMenu}>
                                자전거 대여
                            </NavLink>
                        </li>

                        {/* 여행지 추천 */}
                        <li onMouseEnter={handleMouseEnterOther}>
                            <NavLink to="/travel" onClick={closeMobileMenu}>
                                여행지 추천
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="header-right">
                    <NavLink to="/cart" className="icon-link">
                        <FaCartArrowDown className="icon" /> <span className="text">장바구니</span>
                    </NavLink>
                    <NavLink to="/support" className="icon-link">
                        <FaHeadset className="icon" /> <span className="text">고객센터</span>
                    </NavLink>
                    {/* 로그인 / 로그아웃 토글 */}
                    {user?.isLogin ? (
                    <button
                        className="icon-link logout"
                        onClick={async () => {
                            const csrf = getCsrfToken();
                            await axios.post(
                            "http://localhost:8080/auth/logout",
                            {},
                            {
                                withCredentials: true,
                                headers: { "X-XSRF-TOKEN": csrf },
                            }
                            );

                            logout(); // 전역 로그인 상태 false로
                        }}
                        >
                        <FaSignOutAlt className="icon" /> 
                        <span className="text">로그아웃</span>
                    </button>
                    ) : (
                    <NavLink to="/login" className="icon-link">
                        <FaUser className="icon" /> 
                        <span className="text">로그인</span>
                    </NavLink>
                    )}
                    <Link
                        to="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowChatbot(!showChatbot);
                        }}
                        className={`icon-link ${showChatbot ? "active" : ""}`}
                    >
                        <i className="fa-solid fa-comments"></i>
                        <span className="text">챗봇</span>
                    </Link>

                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* PC 드롭다운 서브메뉴 */}
                {!isMobile && purchaseMenuOpen && (
                    <div className="submenu-container">
                        <div className="submenu-content">
                            <Link to="/products/mountain">산악</Link>
                            <Link to="/products/road">로드</Link>
                            <Link to="/products/lifestyle">라이프스타일</Link>
                            <Link to="/products/electric">전기</Link>
                            <Link to="/compare">비교하기</Link>
                        </div>
                    </div>
                )}
            </header>

            {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

            {/* DIM 레이어 */}
            {menuOpen && isMobile && (
                <div className="dim" onClick={closeMobileMenu}></div>
            )}

            {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
        </>
    );
}
