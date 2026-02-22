import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import SWRegistration from "@/components/SWRegistration";

export const metadata: Metadata = {
  title: "Semana de Treino",
  description: "Acompanhe seus exercícios semanais",
  manifest: "/semana-treino/manifest.json",
  appleWebApp: {
    title: "Treino",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  icons: {
    icon: "/semana-treino/icon-192x192.png",
    apple: "/semana-treino/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen">
        <SWRegistration />
        <main className="max-w-lg mx-auto min-h-screen px-4 pt-8 pb-32">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
