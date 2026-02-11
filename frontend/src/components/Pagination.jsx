import React from 'react';

const PAGE_SIZE = 20;

function Pagination({ pagination, currentPage, setCurrentPage, pageSize = PAGE_SIZE, itemLabel = 'sets' }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, pagination.total);

  return (
    <div className="mt-12 flex flex-col items-center gap-5">
      <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-blue-200">
        <span className="text-sm font-bold text-gray-700">
          Showing <span className="text-blue-600">{from}</span> - <span className="text-blue-600">{to}</span> of <span className="text-blue-600">{pagination.total}</span> {itemLabel}
        </span>
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md"
        >
          ← Previous
        </button>
        <div className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg">
          Page {currentPage} of {pagination.totalPages}
        </div>
        <button
          onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
          disabled={currentPage === pagination.totalPages}
          className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
