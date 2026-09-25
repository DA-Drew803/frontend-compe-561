import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vacation Together | Plan a trip everyone agrees on",
  description:
    "Bring your group's dates, budget, and interests together to plan a trip everyone can look forward to.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
