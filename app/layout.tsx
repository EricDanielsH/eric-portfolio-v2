import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eric Daniels",
  description:
    "Eric Daniels' portfolio. Here you can find my projects, blog posts, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setInitialThemeScript = `
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      const html = document.documentElement;
      html.classList.add(theme);
      html.setAttribute('data-theme', theme);
    })();
  `;

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: setInitialThemeScript,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
