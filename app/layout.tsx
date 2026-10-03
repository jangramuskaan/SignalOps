import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalOps",
  description: "Company intelligence and operational risk platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/95 px-6 backdrop-blur">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  SignalOps Command Center
                </p>

                <p className="hidden text-xs text-slate-500 sm:block">
                  Monitor company performance, risk, and intelligence
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border bg-slate-50 px-3 py-1.5 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-slate-600">
                    Systems operational
                  </span>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  MJ
                </div>
              </div>
            </header>

            <main className="min-w-0 flex-1 bg-slate-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}