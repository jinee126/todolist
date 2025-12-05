import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Todo List",
  description: " Next.js and Spring Boot",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="py-8 px-4 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
