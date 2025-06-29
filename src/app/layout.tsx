import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import { VeloraToaster } from "@/components/ui/VeloraToaster";

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
        <ToastProvider>
          <AuthProvider>
            {children}
            <VeloraToaster />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
