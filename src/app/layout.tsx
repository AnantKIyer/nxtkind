import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {WixClientContextProvider} from "@/context/WixContext";
import {NotificationProvider} from "@/context/NotificationContext";
import NotificationBanner from "@/components/NotificationBanner";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nxtkind",
  description: "Be the Nxt you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
      <WixClientContextProvider>
        <NotificationProvider>
          <Navbar/>
          {children}
          <Footer/>
          <NotificationBanner />
        </NotificationProvider>
      </WixClientContextProvider>
      </body>
    </html>
  );
}
