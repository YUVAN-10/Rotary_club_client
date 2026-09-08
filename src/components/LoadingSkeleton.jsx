import React from "react";
import { Users, AlertCircle, RefreshCw } from "lucide-react";

export const SkeletonRow = () => {
  return (
    <tr className="border-b border-slate-100">
      <td className="py-3.5 sm:py-4 px-3 sm:px-5 text-center">
        <div className="h-4 w-5 mx-auto rounded animate-shimmer" />
      </td>
      <td className="py-3.5 sm:py-4 px-3 sm:px-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full animate-shimmer shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 sm:h-4 w-24 sm:w-32 rounded animate-shimmer" />
            <div className="h-2.5 sm:h-3 w-16 sm:w-20 rounded animate-shimmer sm:hidden" />
          </div>
        </div>
      </td>
      <td className="py-3.5 sm:py-4 px-3 sm:px-5">
        <div className="h-5 sm:h-6 w-20 sm:w-28 rounded-lg animate-shimmer" />
      </td>
      <td className="hidden md:table-cell py-4 px-5">
        <div className="h-5 w-20 rounded-full animate-shimmer" />
      </td>
      <td className="hidden lg:table-cell py-4 px-6">
        <div className="h-4 w-48 rounded animate-shimmer" />
      </td>
      <td className="hidden sm:table-cell py-4 px-4 text-center">
        <div className="h-5 w-16 mx-auto rounded-full animate-shimmer" />
      </td>
      <td className="py-3.5 sm:py-4 px-3 sm:px-5 text-right">
        <div className="h-6 sm:h-7 w-6 sm:w-16 ml-auto rounded-lg animate-shimmer" />
      </td>
    </tr>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Loading header indicator */}
      <div className="flex items-center justify-center gap-3 text-slate-500 py-4">
        <div className="w-5 h-5 border-3 border-[#0B3C8A] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-slate-600">Connecting to Rotary Directory...</span>
      </div>

      {/* Table skeleton */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B3C8A] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 sm:py-4 px-3 sm:px-5 w-10 sm:w-16 text-center">#</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-6">Member</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-5">Contact</th>
                <th className="hidden md:table-cell py-4 px-5">Vertical</th>
                <th className="hidden lg:table-cell py-4 px-6">Address</th>
                <th className="hidden sm:table-cell py-4 px-4 text-center">Status</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-5 text-right w-12 sm:w-auto">
                  <span className="hidden sm:inline">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, idx) => (
                <SkeletonRow key={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const EmptyState = ({ message = "No members available yet.", onReset }) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-8">
      {/* Rotary Empty Illustration */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Users className="w-12 h-12 text-slate-400" />
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
          <span className="text-xs font-bold">RC</span>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-display">
        {message}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {onReset
          ? "We couldn't find any members matching your current search criteria."
          : "Please check back later or contact the Rotary Club of Erode Central administration."}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#0B3C8A] text-white hover:bg-[#082D68] transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Search</span>
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50/80 rounded-3xl p-8 sm:p-10 text-center border border-red-200 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-1">
        Unable to Load Directory
      </h3>
      <p className="text-sm text-red-700/80 max-w-sm mx-auto mb-6">
        {error || "An error occurred while connecting to the Firestore database."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
