import React from "react";

export function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}
