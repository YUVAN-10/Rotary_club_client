import React, { useState } from "react";
import { Building2, Phone, ArrowRight, User } from "lucide-react";

export const MemberCard = ({ member, onSelectMember }) => {
  const [imageError, setImageError] = useState(false);

  // Extract initials for placeholder avatar
  const getInitials = (name) => {
    if (!name) return "RC";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const hasPhoto = member.profilePhoto && !imageError;

  return (
    <div
      onClick={() => onSelectMember(member)}
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top Gold Corner Accent on Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Header: Profile Photo & Status / Vertical Badge */}
        <div className="flex items-start gap-4 mb-4">
          {/* Circular Profile Photo */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#0B3C8A] shadow-md group-hover:scale-105 transition-transform duration-300">
              {hasPhoto ? (
                <img
                  src={member.profilePhoto}
                  alt={member.name || "Rotary Member"}
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-full bg-slate-100"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B3C8A] to-[#062354] flex items-center justify-center text-white font-bold text-base tracking-wider">
                  {getInitials(member.name)}
                </div>
              )}
            </div>
            {/* Status dot */}
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
              title="Completed Profile"
            />
          </div>

          {/* Member Name and Vertical */}
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B3C8A] transition-colors truncate font-display">
              {member.name || "Unnamed Member"}
            </h3>

            {/* Vertical Badge */}
            <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#917112] border border-[#D4AF37]/30 max-w-full truncate">
              <span className="truncate">{member.vertical || "Member"}</span>
            </div>
          </div>
        </div>

        {/* Address Preview (Business Address or Member Address) */}
        {member.businessAddress ? (
          <div className="mt-2 mb-4 text-xs sm:text-sm text-slate-600 flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Building2 className="w-4 h-4 text-[#0B3C8A]/70 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed text-slate-600 font-normal">
              {member.businessAddress}
            </p>
          </div>
        ) : member.memberAddress ? (
          <div className="mt-2 mb-4 text-xs sm:text-sm text-slate-600 flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Building2 className="w-4 h-4 text-[#0B3C8A]/70 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed text-slate-600 font-normal">
              {member.memberAddress}
            </p>
          </div>
        ) : member.phone ? (
          <div className="mt-2 mb-4 text-xs sm:text-sm text-slate-600 flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Phone className="w-4 h-4 text-[#0B3C8A]/70 shrink-0" />
            <span className="font-mono text-slate-700">{member.phone}</span>
          </div>
        ) : null}
      </div>

      {/* Card Action Button: View Details */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[#0B3C8A]/5 text-[#0B3C8A] group-hover:bg-[#0B3C8A] group-hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-current group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
