import Head from "next/head";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Chat from "../../components/Chat";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the default styles for the carousel

export default async function LocaleLayout({ children, params }) {
  // Await the params before using them
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function RootLayout({ children }) {
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
  );
}
