"use client";

import { useEffect } from "react";

interface ThemeInjectorProps {
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export default function ThemeInjector({ theme }: ThemeInjectorProps) {
  useEffect(() => {
    if (!theme) return;
    
    const root = document.documentElement;
    if (theme.primaryColor) {
      root.style.setProperty('--theme-primary', theme.primaryColor);
    }
    if (theme.secondaryColor) {
      root.style.setProperty('--theme-secondary', theme.secondaryColor);
    }
  }, [theme]);

  // Can also inject directly to avoid hydration mismatch flashes
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        :root {
          ${theme?.primaryColor ? `--theme-primary: ${theme.primaryColor};` : ''}
          ${theme?.secondaryColor ? `--theme-secondary: ${theme.secondaryColor};` : ''}
        }
      `
    }} />
  );
}
