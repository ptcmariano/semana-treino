import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Semana de Treino",
  description: "Acompanhe seus exercícios semanais",
  appleWebApp: {
    title: "Treino",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen">
        <main className="max-w-lg mx-auto min-h-screen px-4 pt-8 pb-32">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
