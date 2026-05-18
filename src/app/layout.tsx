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
  themeColor: "#FCFCFD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-background text-foreground min-h-screen selection:bg-afro-blue/10 selection:text-afro-blue overflow-x-hidden antialiased`}
      >
        {/* Subtle tech-grid background and glowing ambient orbs */}
        <div className="fixed inset-0 z-[-1] bg-tech-grid pointer-events-none opacity-70" />
        <div className="fixed top-[-10%] left-[5%] w-[500px] h-[500px] bg-afro-blue/6 rounded-full filter blur-[100px] pointer-events-none z-[-2]" />
        <div className="fixed bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-afro-gold/4 rounded-full filter blur-[120px] pointer-events-none z-[-2]" />
        
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
