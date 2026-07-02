import React from "react";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-6">

      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="border rounded px-3 py-1 disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-9 h-9 rounded ${
              page === i + 1
                ? "bg-green-700 text-white"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="border rounded px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Pagination;