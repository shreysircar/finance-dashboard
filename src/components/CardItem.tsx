"use client";

import { useState } from "react";

type Props = {
  name: string;
  number: string;
  expiry: string;
  balance: number;
  color: string;
  isActive?: boolean;
};

export default function CardItem({
  name,
  number,
  expiry,
  balance,
  color,
  isActive,
}: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 6;
    const rotateY = ((x - midX) / midX) * -6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative w-[90%] mx-auto h-52 rounded-2xl px-6 py-5 text-white overflow-hidden
        transition-transform duration-200 ease-out
        ${color}
        ${isActive ? "scale-105 shadow-[0_25px_60px_rgba(0,0,0,0.45)]" : "opacity-90"}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
          isActive ? 1.05 : 1
        })`,
      }}
    >
      {/* ✨ Top light reflection */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-white/10 blur-xl opacity-40" />

      {/* 🌫️ Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 blur-3xl rounded-full" />

      {/* 🧊 Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[3px]" />

      {/* 🔲 Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10" />

      {/* 💳 Content */}
      <div className="relative h-full flex flex-col justify-between">

        {/* Top */}
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-60">
            {name}
          </p>

          <div className="w-11 h-7 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Number */}
        <div className="text-[16px] tracking-[0.35em] font-medium mt-2">
          **** **** **** {number.slice(-4)}
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] opacity-50">
              Balance
            </p>
            <p className="text-lg font-semibold">₹{balance}</p>
          </div>

          <div className="text-center">
            <p className="text-[9px] uppercase tracking-[0.25em] opacity-50">
              Exp
            </p>
            <p className="text-sm">{expiry}</p>
          </div>

          <div className="text-xs font-semibold tracking-[0.3em] opacity-80">
            VISA
          </div>
        </div>
      </div>
    </div>
  );
}