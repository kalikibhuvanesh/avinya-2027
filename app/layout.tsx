import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AVINYA 2027 | Beyond the Horizon',
  description:
    'Three islands. One journey. Endless possibilities. Experience AVINYA 2027 at IIIT Dharwad, 12–14 March 2027.',
  openGraph: {
    title: 'AVINYA 2027 | Beyond the Horizon',
    description:
      'Three islands. One journey. Endless possibilities. Join us at IIIT Dharwad, 12–14 March 2027.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVINYA 2027 | Beyond the Horizon',
    description: 'Three islands. One journey. Endless possibilities.',
  },
  icons: {
  icon: '/favicon.png',
  shortcut: '/favicon.png',
  apple: '/favicon.png',
},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
