

// app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Smart Task Manager',
  description: 'Manage your productivity smartly!',
};

export default function RootLayout({ children }) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Disable all console logging in production (optional)
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
