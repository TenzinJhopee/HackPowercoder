import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { THEME_STORAGE_KEY } from "@/components/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TellHorn — The William Tell of your finances",
  description: "A voice advisor that tells you what your money is doing. Hackathon prototype."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before the first paint so a saved dark look never flashes light. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}` }} />
      </head>
      <body className={inter.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
