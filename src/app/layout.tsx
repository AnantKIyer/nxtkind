import type { Metadata } from "next";
import { Poppins, League_Spartan } from "next/font/google";
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

const leagueSpartan = League_Spartan({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-league-spartan",
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
        className={`${poppins.variable} ${leagueSpartan.variable} font-sans antialiased`}
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
