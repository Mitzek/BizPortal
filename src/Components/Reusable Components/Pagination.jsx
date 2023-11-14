import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  title,
  handlePageChange,
}) {
  if (title === "shops") {
    return (
      <span>
        <button
          className="pageButton"
          disabled={currentPage === 1}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="pageButton"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </span>
    );
  } else if (title === "orders") {
    return (
      <span>
        <button
          className="pageButton"
          disabled={currentPage === 1}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="pageButton"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </span>
    );
  } else if (title === "balanceSheet") {
    return (
      <span>
        <button
          className="pageButton"
          disabled={currentPage === 1}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="pageButton"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </span>
    );
  } else if (title === "debitHistory") {
    return (
      <span>
        <button
          className="pageButton"
          disabled={currentPage === 1}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="pageButton"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </span>
    );
  }
}
