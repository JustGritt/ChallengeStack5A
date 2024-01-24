"use client";
/* eslint-disable @next/next/no-page-custom-font */
import NavBar from "@/components/Header/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "@/components/Footer";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { appApi } from "@/redux/api/authApi";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApiProvider api={appApi}>
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
            <Toaster />
          </div>
          <Footer />
        </body>
      </html>
    </ApiProvider>
  );
}
