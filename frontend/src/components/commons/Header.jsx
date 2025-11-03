import React, { useState } from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {FaHeadset, FaUser, FaBars, FaTimes, FaCartArrowDown} from "react-icons/fa";
import '../../styles/purchaseheader.css';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [purchaseMenuOpen,setPurchaseMenuOpen] = useState(null);
    const location = useLocation();

    return (
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
                    <li onMouseEnter={() => setPurchaseMenuOpen('purchase')}>
                        <NavLink to="/products/mountain" onClick={() => setMenuOpen(false)}>
                            자전거 구매
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rental" onClick={() => setMenuOpen(false)}>
                            자전거 대여
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/travel" onClick={() => setMenuOpen(false)}>
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
                <button className="search-btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

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
                <div className="submenu-container">
                    <div className="submenu-content">
                        <Link to="/products/mountain">산악</Link>
                        <Link to="/products/road">로드</Link>
                        <Link to="/products/lifestyle">라이프스타일</Link>
                        <Link to="/products/electric">전기</Link>
                        {/*<Link to="/products/brand">브랜드</Link>*/}
                    </div>
                </div>
            )}
        </header>
    );
}
