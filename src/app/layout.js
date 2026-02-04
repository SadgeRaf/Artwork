import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Rafs Artworks - Professional Digital Art & Commissions",
    template: '%s | Rafs Artworks'
  },
  description: "Discover stunning digital artworks and commission custom pieces from Raf, a professional digital artist specializing in portraits, character design, and anime-style illustrations.",
  keywords: ["digital art", "commissions", "portraits", "anime art", "character design", "custom artwork", "digital illustration", "artist portfolio"],
  authors: [{ name: "Raf" }],
  creator: "Raf",
  publisher: "Rafs Artworks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://artwork-two-virid.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Rafs Artworks - Professional Digital Art & Commissions",
    description: "Discover stunning digital artworks and commission custom pieces from Raf, a professional digital artist specializing in portraits, character design, and anime-style illustrations.",
    url: 'https://artwork-two-virid.vercel.app',
    siteName: 'Rafs Artworks',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafs Artworks - Digital Art Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rafs Artworks - Professional Digital Art & Commissions",
    description: "Discover stunning digital artworks and commission custom pieces from Raf, a professional digital artist.",
    images: ['/og-image.jpg'],
    creator: '@rafsartworks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const testFont = localFont({
  src: './../fonts/ShortBaby-Mg2w.ttf',
});

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raf',
    jobTitle: 'Digital Artist',
    description: 'Professional digital artist specializing in portraits, character design, and anime-style illustrations',
    url: 'https://artwork-two-virid.vercel.app',
    sameAs: [
      'https://instagram.com/rafsartworks',
      'https://twitter.com/rafsartworks',
      'https://artstation.com/rafsartworks'
    ],
    knowsAbout: [
      'Digital Art',
      'Character Design',
      'Portrait Art',
      'Anime Illustration',
      'Commission Art'
    ],
    offers: {
      '@type': 'Service',
      name: 'Custom Art Commissions',
      description: 'Custom digital artwork including portraits, character designs, and illustrations'
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <main className="flex-1">
              {children}
            </main>
            <Footer></Footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
