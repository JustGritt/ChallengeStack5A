"use client";
/* eslint-disable @next/next/no-page-custom-font */
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "mapbox-gl/dist/mapbox-gl.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { store } from "@/lib/services/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <Head>
          <title>sdsds</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <body className="min-h-screen">
          <main>
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </Provider>
  );
}