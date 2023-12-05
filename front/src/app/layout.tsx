/* eslint-disable @next/next/no-page-custom-font */
import NavBar from '@/components/Header/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const inter = Inter({ subsets: ['latin'] })
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>sdsds</title>

        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <body className="min-h-screen">
        <NavBar />
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
