import React, { useState, useMemo, useEffect } from "react";
import { Hero } from "../components/Hero";
import { SearchFilter } from "../components/SearchFilter";
import { MemberTable } from "../components/MemberTable";
import { Pagination } from "../components/Pagination";
import { MemberModal } from "../components/MemberModal";
import {
  LoadingSkeleton,
  EmptyState,
  ErrorState,
} from "../components/LoadingSkeleton";
import { useMembers } from "../hooks/useMembers";
import { Users } from "lucide-react";

const PAGE_SIZE = 10;

export const Home = () => {
  const { members, loading, error } = useMembers();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return members;

    return members.filter((member) => {
      const nameMatch = (member.name || "").toLowerCase().includes(query);
      const phoneMatch = (member.phone || "").toLowerCase().includes(query);
      const verticalMatch = (member.vertical || "").toLowerCase().includes(query);
      const businessMatch = (member.businessAddress || "").toLowerCase().includes(query);
      const addressMatch = (member.memberAddress || "").toLowerCase().includes(query);
      const dobMatch = (member.dob || "").toLowerCase().includes(query);
      const weddingMatch = (member.weddingDate || "").toLowerCase().includes(query);

      return (
        nameMatch ||
        phoneMatch ||
        verticalMatch ||
        businessMatch ||
        addressMatch ||
        dobMatch ||
        weddingMatch
      );
    });
  }, [members, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentMembers = useMemo(() => {
    return filteredMembers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredMembers, startIndex]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Smooth scroll back up to table header if user navigated
    const tableElement = document.getElementById("members-table-container");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero / Welcome Section */}
      <Hero />

      {/* Main Members Section */}
      <main id="members" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C8A]/10 text-[#0B3C8A] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Club Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Our Members
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto my-2.5 rounded-full" />
        </div>

        {/* Real-time Search Bar */}
        <div className="mb-6">
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalCount={members.length}
            filteredCount={filteredMembers.length}
          />
        </div>

        {/* Members Table / States */}
        <div id="members-table-container" className="space-y-4">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          ) : members.length === 0 ? (
            <EmptyState message="No members available yet." />
          ) : filteredMembers.length === 0 ? (
            <EmptyState
              message="No matching members found."
              onReset={handleResetFilters}
            />
          ) : (
            <>
              <MemberTable
                members={currentMembers}
                onSelectMember={(m) => setSelectedMember(m)}
                startIndex={startIndex}
              />

              {/* 10-Item Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredMembers.length}
                pageSize={PAGE_SIZE}
              />
            </>
          )}
        </div>
      </main>

      {/* Member Full Details Modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};
