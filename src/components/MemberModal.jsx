import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export const MemberModal = ({ member, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!member) return null;

  const getInitials = (name) => {
    if (!name) return "RC";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const hasPhoto = member.profilePhoto && !imageError;

  const handleCopyPhone = () => {
    if (member.phone) {
      navigator.clipboard.writeText(member.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helpers for WhatsApp and Tel URLs
  const getWhatsAppUrl = (phone) => {
    if (!phone) return "#";
    let digits = phone.replace(/[^\d]/g, "");
    if (digits.length === 10) {
      digits = "91" + digits;
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = "91" + digits.slice(1);
    }
    return `https://wa.me/${digits}`;
  };

  const getTelUrl = (phone) => {
    if (!phone) return "#";
    const clean = phone.replace(/[^\d+]/g, "");
    return `tel:${clean}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal / Bottom-sheet Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden animate-slide-up-mobile sm:animate-none"
      >
        {/* Mobile Pull Bar Indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Top Header Banner with Rotary Blue Gradient */}
        <div className="relative bg-gradient-to-r from-[#0B3C8A] via-[#082D68] to-[#062354] p-6 pb-16 text-white text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Rotary subtle gear watermark */}
          <div className="absolute right-3 bottom-2 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-24 h-24 fill-current text-white">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="15" fill="currentColor" />
            </svg>
          </div>

          <div className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1">
            Member Profile
          </div>
          <div className="text-sm font-medium text-blue-100">
            Rotary Club of Erode Central
          </div>
        </div>

        {/* Floating Avatar & Details Body */}
        <div className="relative px-6 pb-6 pt-0 -mt-12 flex-1 overflow-y-auto">
          {/* Profile Photo */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white shadow-xl">
                <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#0B3C8A]">
                  {hasPhoto ? (
                    <img
                      src={member.profilePhoto}
                      alt={member.name || "Member Photo"}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-full bg-slate-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B3C8A] to-[#062354] flex items-center justify-center text-white font-extrabold text-2xl tracking-wider">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Member Name */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              {member.name || "Unnamed Member"}
            </h2>

            {/* Badge: Vertical */}
            <div className="mt-2 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#917112] border border-[#D4AF37]/30">
                <Briefcase className="w-3.5 h-3.5" />
                {member.vertical || "Rotarian"}
              </span>
            </div>
          </div>

          {/* Details Information List */}
          <div className="mt-6 space-y-3.5 text-left">
            {/* Phone Number & Direct Actions */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3C8A]/10 flex items-center justify-center text-[#0B3C8A] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Phone Number
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {member.phone || "Not provided"}
                  </div>
                </div>
              </div>

              {member.phone && (
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#0B3C8A] hover:border-[#0B3C8A]/40 transition-colors shadow-xs cursor-pointer"
                    title="Copy phone"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={getWhatsAppUrl(member.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-xs flex items-center justify-center"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={getTelUrl(member.phone)}
                    className="px-3 py-2 rounded-lg bg-[#0B3C8A] hover:bg-[#082D68] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              )}
            </div>

            {/* Business Address */}
            {member.businessAddress && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Business Address
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        member.businessAddress + " Erode"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#0B3C8A] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-800 font-normal leading-relaxed mt-0.5 whitespace-pre-line">
                    {member.businessAddress}
                  </p>
                </div>
              </div>
            )}

            {/* Member / Residence Address */}
            {member.memberAddress && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#0B3C8A] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Member Address / Residence
                  </span>
                  <p className="text-sm text-slate-800 font-normal leading-relaxed mt-0.5 whitespace-pre-line">
                    {member.memberAddress}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Close Button */}
          <div className="mt-6 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
