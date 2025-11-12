import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHeadset, FaUser, FaBars, FaTimes, FaCartArrowDown } from "react-icons/fa";
import { Chatbot } from "../../pages/support/Chatbot.jsx";
import '../../styles/purchaseheader.css';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [purchaseMenuOpen,setPurchaseMenuOpen] = useState(null);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const location = useLocation();

    const closeAllMenus = () => {
        setMenuOpen(false);
        setMobileSubmenuOpen(false);
    };

    useEffect(() => {
        // 🔵 Support에서 발생한 이벤트를 수신
        const handleChatbotToggle = (e) => {
            setShowChatbot(e.detail); // true/false 전달받음
        };

        window.addEventListener("chatbotToggle", handleChatbotToggle);
        return () => window.removeEventListener("chatbotToggle", handleChatbotToggle);
    }, []);

    return (
        <>
            <header className="header" onMouseLeave={()=>setPurchaseMenuOpen(null)}>
                {/* 좌측 로고 */}
                <div className="header-left">
                    <Link to="/" className="logo">
                        Bicycle-App
                    </Link>
                </div>

                {/* 중앙 메뉴 (데스크톱용) */}
                <nav className={`header-center ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li className="desktop-only" onMouseEnter={() => setPurchaseMenuOpen('purchase')}>
                            <NavLink to="/products/mountain" onClick={closeAllMenus}>
                                자전거 구매
                            </NavLink>
                        </li>
                        <li className="nav-item mobile-only">
                            <button
                                type="button"
                                className={`accordion-toggle ${mobileSubmenuOpen ? "active" : ""}`}
                                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                            >
                                자전거 구매
                                <span className="accordion-arrow">{mobileSubmenuOpen ? '▲' : '▼'}</span>
                            </button>
                            {/* 모바일 아코디언 서브메뉴 */}
                            {mobileSubmenuOpen && (
                                <div className="mobile-submenu">
                                    <Link to="/products/mountain" onClick={closeAllMenus}>산악</Link>
                                    <Link to="/products/road" onClick={closeAllMenus}>로드</Link>
                                    <Link to="/products/lifestyle" onClick={closeAllMenus}>라이프스타일</Link>
                                    <Link to="/products/electric" onClick={closeAllMenus}>전기</Link>
                                    <Link to="/compare" onClick={closeAllMenus}>비교하기</Link>
                                </div>
                            )}
                        </li>
                        <li onMouseEnter={() => setPurchaseMenuOpen(null)}>
                            <NavLink to="/rental" onClick={closeAllMenus}>
                                자전거 대여
                            </NavLink>
                        </li>
                        <li onMouseEnter={() => setPurchaseMenuOpen(null)}>
                            <NavLink to="/travel" onClick={closeAllMenus}>
                                여행지 추천
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* 우측 메뉴 */}
                <div className="header-right">
                    <NavLink to="/cart" className="icon-link">
                        <FaCartArrowDown className="icon" />
                        <span className="text">장바구니</span>
                    </NavLink>
                    <NavLink to="/support" className="icon-link">
                        <FaHeadset className="icon" />
                        <span className="text">고객센터</span>
                    </NavLink>
                    <NavLink to="/login" className="icon-link">
                        <FaUser className="icon" />
                        <span className="text">로그인</span>
                    </NavLink>
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

                    {/* 햄버거 버튼 (모바일용) */}
                    <button
                        className="menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="메뉴 열기"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {purchaseMenuOpen === 'purchase' && (
                    <div className="submenu-container desktop-only">
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

            {/* Chatbot 팝업 */}
            {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
        </>
    );
}