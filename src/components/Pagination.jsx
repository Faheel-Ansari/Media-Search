import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  return (
    <div className="w-4/5 pb-10 flex items-center justify-center mx-auto gap-3">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 border px-4 pr-6 py-1 rounded-lg
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-white/10 transition"
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      <div className="flex gap-2 overflow-x-auto">
          <button
            className={`px-4 py-1 rounded-lg transition bg-gray-400/15 border text-white font-bold`}>
            {currentPage}
          </button>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 border px-4 pl-6 py-1 rounded-lg
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-white/10 transition"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
