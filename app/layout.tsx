import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { getThemeConfig, getHeader, getFooter } from "./lib/api";
import { buildThemeCss } from "./lib/theme";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, headerData, footerData] = await Promise.all([getThemeConfig(), getHeader(), getFooter()]);
  const themeCss = theme ? buildThemeCss(theme) : "";

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {themeCss && <style id="style-var" dangerouslySetInnerHTML={{ __html: themeCss }} />}
      </head>
      <body className="min-h-full flex flex-col">
        {/* <SmoothScroll /> */}
        <Header data={headerData} />
        <main className="flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
