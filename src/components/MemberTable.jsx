import React from "react";
import { Phone, MapPin, Eye } from "lucide-react";

export const MemberTable = ({
  members,
  onSelectMember,
  startIndex = 0,
}) => {
  // Extract initials for placeholder avatar
  const getInitials = (name) => {
    if (!name) return "RC";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getTelUrl = (phone) => {
    if (!phone) return "#";
    const clean = phone.replace(/[^\d+]/g, "");
    return `tel:${clean}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="w-full">
        <table className="w-full text-left border-collapse table-auto">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#0B3C8A] text-white text-xs uppercase tracking-wider font-semibold border-b border-[#D4AF37]/40">
              <th className="py-3.5 sm:py-4 px-2.5 sm:px-5 w-8 sm:w-16 text-center text-[11px] sm:text-xs">#</th>
              <th className="py-3.5 sm:py-4 px-2.5 sm:px-6 text-[11px] sm:text-xs">Member</th>
              <th className="py-3.5 sm:py-4 px-2.5 sm:px-5 text-[11px] sm:text-xs text-right sm:text-left">Contact</th>
              <th className="hidden md:table-cell py-4 px-5">Vertical</th>
              <th className="hidden lg:table-cell py-4 px-6">Address</th>
              <th className="hidden sm:table-cell py-4 px-5 text-right w-24">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {members.map((member, idx) => {
              const serialNo = startIndex + idx + 1;
              const hasPhone = Boolean(member.phone && member.phone.trim());

              return (
                <tr
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="hover:bg-blue-50/60 active:bg-blue-100/50 transition-colors cursor-pointer group"
                  title="Click to view full details"
                >
                  {/* S.No */}
                  <td className="py-3 sm:py-4 px-2.5 sm:px-5 text-center font-mono font-bold text-xs sm:text-sm text-slate-400 group-hover:text-[#0B3C8A]">
                    {serialNo}
                  </td>

                  {/* Member Name & Avatar */}
                  <td className="py-3 sm:py-4 px-2.5 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3.5">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#0B3C8A] shadow-2xs">
                          {member.profilePhoto ? (
                            <img
                              src={member.profilePhoto}
                              alt={member.name}
                              className="w-full h-full object-cover rounded-full bg-slate-100"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full rounded-full bg-gradient-to-br from-[#0B3C8A] to-[#062354] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs tracking-wider ${
                              member.profilePhoto ? "hidden" : "flex"
                            }`}
                          >
                            {getInitials(member.name)}
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0B3C8A] transition-colors leading-snug break-words sm:truncate">
                          {member.name || "Unnamed Member"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact / Phone */}
                  <td className="py-3 sm:py-4 px-2.5 sm:px-5 text-right sm:text-left whitespace-nowrap">
                    {hasPhone ? (
                      <a
                        href={getTelUrl(member.phone)}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-[#0B3C8A] hover:bg-blue-100 font-mono bg-blue-50/90 px-2 sm:px-2.5 py-1 rounded-lg border border-blue-100 transition-colors shadow-2xs"
                        title={`Call ${member.name}`}
                      >
                        <Phone className="w-3 h-3 text-[#0B3C8A]" />
                        <span>{member.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[11px] sm:text-xs text-slate-400 italic">N/A</span>
                    )}
                  </td>

                  {/* Vertical (Desktop only) */}
                  <td className="hidden md:table-cell py-4 px-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#917112] border border-[#D4AF37]/30 whitespace-nowrap">
                      {member.vertical || "Rotarian"}
                    </span>
                  </td>

                  {/* Address (Large screens only) */}
                  <td className="hidden lg:table-cell py-4 px-6 max-w-xs">
                    <div className="flex items-start gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed">
                        {member.memberAddress || member.businessAddress || (
                          <span className="text-slate-400 italic">No address listed</span>
                        )}
                      </p>
                    </div>
                  </td>

                  {/* Action (Desktop only) */}
                  <td className="hidden sm:table-cell py-4 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMember(member);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B3C8A]/10 text-[#0B3C8A] hover:bg-[#0B3C8A] hover:text-white transition-all shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
