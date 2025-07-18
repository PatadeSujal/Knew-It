import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ItemListProvider } from "./store/items-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KnewIt - Know Everything what you eat",
  description: "Track your grocery nutrition with ease. View protein, fats, and sugar content instantly.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ItemListProvider>
          <Navbar />
          {children}
          <SpeedInsights />
        </ItemListProvider>
      </body>
    </html>
  );
}
