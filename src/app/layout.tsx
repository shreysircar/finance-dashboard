import "./globals.css";
import Sidebar from "../components/Sidebar";
import { FinanceProvider } from "@/context/FinanceContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<body className="bg-[#020617] text-white">
        <FinanceProvider>
          <div className="flex min-h-screen">
            
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
<main className="flex-1 p-8 bg-[#0f172a]">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>

          </div>
        </FinanceProvider>
      </body>
    </html>
  );
}