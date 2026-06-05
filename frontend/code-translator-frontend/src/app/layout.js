import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Code Translator",
  description: "Seamlessly convert syntax between languages with deep learning precision.",
};

export default function RootLayout({ children }) {
  // suppressHydrationWarning added to prevent mismatch before client-side theme loads
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans min-h-screen`}>
        {children}
      </body>
    </html>
  );
}