import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SNIA PHOTO',
  description: 'Snia Photo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
            <link rel="manifest" href="./manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
