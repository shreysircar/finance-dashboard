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
      <body>
        <FinanceProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50 min-h-screen">
              {children}
            </main>
          </div>
        </FinanceProvider>
      </body>
    </html>
  );
}