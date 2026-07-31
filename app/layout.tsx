import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Holidayz FIT Package Builder",
  description: "Create, publish and manage bespoke FIT package proposals.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
