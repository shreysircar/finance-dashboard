import "./globals.css";
import Sidebar from "../components/Sidebar";
import { FinanceProvider } from "@/context/FinanceContext";
import { RoleProvider } from "@/context/RoleContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        {/* ✅ Wrap BOTH providers */}
        <RoleProvider>
          <FinanceProvider>

            <div className="flex min-h-screen">
              
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <main className="flex-1 p-8 bg-[#0f172a] min-h-0">
                <div className="max-w-7xl mx-auto min-h-0">
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