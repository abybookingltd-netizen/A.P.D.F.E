import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        let start = Math.max(1, currentPage - Math.floor(showMax / 2));
        let end = Math.min(totalPages, start + showMax - 1);

        if (end - start + 1 < showMax) {
            start = Math.max(1, end - showMax + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between px-10 py-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages}</span>
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map(pageNum => (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${currentPage === pageNum
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};
