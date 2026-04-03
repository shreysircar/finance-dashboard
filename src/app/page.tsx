"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("username");
  }, []);

  const handleContinue = () => {
    if (!name.trim()) return;

    localStorage.setItem("username", name.trim());
    router.push("/dashboard");
  };

  return (<div className="relative w-full flex items-center justify-center">

  {/*Animated Glow Orbs */}
  <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#4a9eb3]/20 blur-3xl rounded-full animate-float" />
  <div className="absolute bottom-[-120px] right-[-100px] w-72 h-72 bg-[#025a6a]/20 blur-3xl rounded-full animate-float" />

  {/* Card */}
  <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">

    <div>
      <h1 className="text-3xl font-semibold">
        Welcome 
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        Let’s personalize your dashboard
      </p>
    </div>

    {/*  Input with glow focus */}
    <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="
        w-full px-4 py-3 rounded-lg
        bg-white/5 border border-white/10
        text-white placeholder-gray-400
        outline-none
        transition-all duration-300
        focus:ring-2 focus:ring-[#4a9eb3]
        focus:shadow-[0_0_20px_rgba(74,158,179,0.4)]
      "
    />

    <button
      onClick={handleContinue}
      className="
        w-full py-3 rounded-lg
        bg-gradient-to-r from-[#025a6a] to-[#4a9eb3]
        hover:opacity-90 transition
        text-white font-medium
      "
    >
      Continue
    </button>
  </div>
</div>);}