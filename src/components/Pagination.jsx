import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ page, pages, onPageChange }) => {
    return pages > 1 ? (
        <div className="flex justify-center mt-8 gap-4 items-center">
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="p-2 border border-gray-200 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 bg-white transition-colors"
            >
                <FiChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-gray-600">
                Page <span className="font-bold text-black">{page}</span> of <span className="font-bold text-black">{pages}</span>
            </span>
            <button
                disabled={page === pages}
                onClick={() => onPageChange(page + 1)}
                className="p-2 border border-gray-200 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 bg-white transition-colors"
            >
                <FiChevronRight size={18} />
            </button>
        </div>
    ) : null;
};

export default Pagination;
