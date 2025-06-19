import type { Metadata } from "next";
import "./globals.css";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Velora",
  description: "Velora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
