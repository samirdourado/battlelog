import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeaderBoardProvider } from "@/contexts/leaderBoardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battle Log",
  description: "Helping Axie Infinity Origins players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LeaderBoardProvider>
          {children}
        </LeaderBoardProvider>
      </body>
    </html>
  );
}
