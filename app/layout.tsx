import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  preload: false,
});

export const metadata: Metadata = {
  title: 'Anistour Management',
  description: 'Gestion de flotte de véhicules',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}