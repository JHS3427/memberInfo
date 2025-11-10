import React, { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Pagination } from "./Pagination.jsx";

export function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetch("/data/qna.json")
      .then((res) => res.json())
      .then(setFaqs)
      .catch((err) => console.error("❌ QNA 데이터를 불러오지 못했습니다:", err));
  }, []);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="faq-section">
      {currentFaqs.map((item, i) => (
        <div
          key={item.qid}
          className={`faq-item ${openIndex === i ? "open" : ""}`}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="faq-question">
            <FaQuestionCircle />
            <div className="faq-text">
              <span className="faq-q">{item.q}</span>
              {item.qcode && (
                <small className="faq-category">{item.qcode}</small>
              )}
            </div>
          </div>

          {openIndex === i && (
            <div
              className="faq-answer"
              dangerouslySetInnerHTML={{
                __html: item.a.replace(/\n/g, "<br />"),
              }}
            />
          )}
        </div>
      ))}

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
