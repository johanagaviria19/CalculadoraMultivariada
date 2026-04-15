import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalMulti3D",
  description: "Calculadora Multivariada 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjs@11.11.0/lib/browser/math.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script" async></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
