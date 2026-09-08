import React from "react";
import { Search, X, Users } from "lucide-react";

export const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="w-full space-y-3">
      {/* Clean Full-Width Real-Time Search Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/80 transition-shadow hover:shadow-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-[#0B3C8A]/70" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone number, address, or vertical..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B3C8A] focus:border-transparent text-sm sm:text-base transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Counter Bar */}
      <div className="flex items-center justify-between px-1 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B3C8A]/10 text-[#0B3C8A] font-bold text-xs">
            <Users className="w-3.5 h-3.5 text-[#0B3C8A]" />
            {filteredCount} {filteredCount === 1 ? "Member" : "Members"}
          </span>
          {searchTerm && totalCount !== filteredCount && (
            <span className="text-slate-500 text-xs">
              (matching "{searchTerm}")
            </span>
          )}
        </div>

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-xs text-[#0B3C8A] font-semibold hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>
    </div>
  );
};
