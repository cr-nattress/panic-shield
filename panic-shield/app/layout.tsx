import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './design-system.css';
import './panic-mode.css';
import { StoreProvider } from '@/contexts/StoreContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Panic Shield - Emotion Wheel',
  description: 'Evidence-based emotion tracking and grounding support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}