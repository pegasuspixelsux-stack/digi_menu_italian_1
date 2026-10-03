import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ColorProvider } from '@/lib/color-context';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'digi_menu | Restaurant Menu Platform',
  description: 'A modern, Apple-designed digital menu management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.className} ${jakarta.className}`}>
      <body className={jakarta.className}>
        <AuthProvider>
          <ColorProvider>
            {children}
          </ColorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
