"use client";


import Head from "next/head";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Head>
          {/* Add your Google Fonts link here */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Open+Sans:wght@300;400;600&display=swap"
          />
        </Head>
      <body>
      <Header />
        <main>{children}</main>
        <Chat />
        <Footer />
      </body>
    </html>
  )
}