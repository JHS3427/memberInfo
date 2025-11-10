import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination.jsx";

export function Resources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources([...data].sort((a, b) => a.id - b.id)))
      .catch((err) => console.error("❌ 자료실 데이터를 불러오지 못했습니다:", err));
  }, []);

  const filtered =
    filter === "전체" ? resources : resources.filter((i) => i.category === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="resources-section">
      <div className="resources-header">
        <select
          className="resources-filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="전체">전체</option>
          <option value="카탈로그">카탈로그</option>
          <option value="사용설명서">사용설명서</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <ul className="resources-list">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="resources-item"
            onClick={() => window.open(item.url, "_blank")}
          >
            <span className="file-icon">
              <i className="fa-solid fa-folder" />
            </span>
            <span className="file-title">{item.title}</span>
            <span className="file-type">
              <i className="fa-solid fa-download" /> PDF
            </span>
          </li>
        ))}

        {currentItems.length === 0 && <li className="no-data">자료가 없습니다.</li>}
      </ul>

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
