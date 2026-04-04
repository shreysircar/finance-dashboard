"use client";

import "./globals.css";
import Sidebar from "../components/Sidebar";
import { FinanceProvider } from "@/context/FinanceContext";
import { RoleProvider } from "@/context/RoleContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <html lang="en">
<body className="text-white overflow-x-hidden">

        <RoleProvider>
          <FinanceProvider>

            <div
              className={`flex min-h-screen ${
isLanding
  ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] animate-gradient"
                  : "bg-[#020617]"
              }`}
            >
              {/* Sidebar */}
              {!isLanding && <Sidebar />}

              {/* Main */}
              <main
                className={`flex-1 ${
                  isLanding
                    ? "w-full flex items-center justify-center px-4"
                    : "p-8 bg-[#0f172a]"
                }`}
              >
                <div
                  className={`${
                    isLanding ? "w-full" : "max-w-7xl mx-auto w-full"
                  }`}
                >
                  {children}
                </div>
              </main>
            </div>

          </FinanceProvider>
        </RoleProvider>

      </body>
    </html>
  );
}