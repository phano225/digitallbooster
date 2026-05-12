import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digitall Booster | Solutions Digitales Premium en Afrique",
  description: "Startup technologique panafricaine spécialisée en développement Web, Mobile, SaaS et PWA. Propulsez votre croissance avec l'excellence digitale.",
  keywords: ["Développement web", "Afrique", "SaaS", "Application Mobile", "PWA", "Startup"],
  authors: [{ name: "Digitall Booster" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-background text-foreground min-h-screen selection:bg-afro-green selection:text-black overflow-x-hidden antialiased`}
      >
        <div className="fixed inset-0 z-[-1] bg-african-pattern opacity-40 pointer-events-none" />
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-afro-green/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse z-[-2]" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-afro-orange/10 rounded-full mix-blend-screen filter blur-[120px] z-[-2]" />
        
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
