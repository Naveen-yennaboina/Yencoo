import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LayoutProvider } from "@/components/providers/LayoutProvider";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { Navbar } from "@/features/core/components/Navbar";
import { Sidebar } from "@/features/core/components/Sidebar";
import { Footer } from "@/features/core/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yencoo",
  description: "Yencoo Foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col font-sans antialiased`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LayoutProvider>
              <div className="relative flex min-h-screen flex-col w-full">
                <Navbar />
                <div className="flex flex-1 items-start w-full">
                  <Sidebar />
                  <main className="flex-1 w-full min-w-0">
                    {children}
                  </main>
                </div>
                <Footer />
              </div>
            </LayoutProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
