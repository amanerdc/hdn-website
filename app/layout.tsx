import React from "react"
import type { Metadata } from 'next'
import { Poppins, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: 'HDN Integrated Farm - Fresh Organic Produce & Farm Events',
  description: 'Discover fresh, organic produce and join us for farm tours, pick & pay experiences, and community events at HDN Integrated Farm. Located in Brgy. Carolina, Naga City.',
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
