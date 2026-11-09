"use client";

import type { ReactNode } from "react";

interface GlowingButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "primary"
    | "cyan"
    | "shark"
    | "navy"
    | "wood"
    | "gold"
    | "whatsapp"
    | "outline"
    | "outlineCyan"
    | "outlineShark"
    | "outlineWood"
    | "white";
}

export default function GlowingButton({
  children,
  href,
  target,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-[13px] font-semibold tracking-wide",
    md: "px-5 py-2.5 text-[14px] font-semibold tracking-wide",
    lg: "px-6 py-3.5 text-[15px] font-bold tracking-wide",
    xl: "px-8 py-4 text-[16px] font-extrabold tracking-wide",
  }[size];

  // MARCENARIA TUBARÃO Brand Palette:
  // Cyan (#00B4D8 / #0284C7), Shark Navy (#0B1320 / #0F172A), Noble Wood (#D4A373 / #C29B38), WhatsApp (#16A34A / #22C55E)
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#00AEEF] to-[#0284C7] hover:from-[#00B4D8] hover:to-[#0077B6] text-white font-bold shadow-md hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0",
    cyan:
      "bg-gradient-to-r from-[#00AEEF] to-[#0284C7] hover:from-[#00B4D8] hover:to-[#0077B6] text-white font-bold shadow-md hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0",
    shark:
      "bg-[#0B1320] hover:bg-[#131E33] text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700/60 hover:border-cyan-500/50 hover:-translate-y-0.5 active:translate-y-0",
    navy:
      "bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 hover:-translate-y-0.5 active:translate-y-0",
    wood:
      "bg-gradient-to-r from-[#D4A373] via-[#C29B38] to-[#9A6B34] hover:from-[#C29B38] hover:to-[#7A5324] text-[#0B1320] font-extrabold shadow-md hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 border border-amber-300/60 hover:-translate-y-0.5 active:translate-y-0",
    gold:
      "bg-gradient-to-r from-[#FACC15] via-[#F59E0B] to-[#D97706] hover:from-[#EAB308] hover:to-[#B45309] text-[#0B1320] font-extrabold shadow-md hover:shadow-lg hover:shadow-amber-500/35 transition-all border border-amber-300 hover:-translate-y-0.5 active:translate-y-0",
    whatsapp:
      "bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold shadow-md hover:shadow-xl hover:shadow-green-600/35 transition-all duration-300 border border-green-500/30 hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "border border-slate-300 bg-white text-slate-800 hover:text-[#00B4D8] hover:border-[#00B4D8] hover:bg-[#F0F9FF] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all",
    outlineCyan:
      "border-2 border-[#00B4D8] bg-transparent text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold",
    outlineShark:
      "border-2 border-[#0B1320] bg-transparent text-[#0B1320] hover:bg-[#0B1320] hover:text-white shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold",
    outlineWood:
      "border-2 border-[#C29B38] bg-transparent text-[#9A6B34] hover:bg-[#C29B38] hover:text-[#0B1320] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold",
    white:
      "border border-slate-200 bg-white text-[#0B1320] hover:text-[#00B4D8] hover:bg-slate-50 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold",
  }[variant];

  const classes =
    "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8] select-none text-center cursor-pointer whitespace-nowrap " +
    sizeClasses +
    " " +
    variantClasses +
    " " +
    className;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
