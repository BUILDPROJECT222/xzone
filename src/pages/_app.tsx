// src/pages/_app.tsx
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import Link from "next/link";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import PromoBar from "@/components/PromoBard";
import React from "react";
import TheSidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function MyApp({ Component, pageProps }: AppProps) {
  const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL as string;

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config={{ commitment: "processed" }} 
    >
      <WalletProvider autoConnect wallets={[]}>
        <WalletModalProvider>
          <DefaultSeo
            title="Xzone"
            description="X Powered By SOL"
            canonical="https://solx.vercel.app"
            openGraph={{
              type: "website",
              locale: "en_US",
              url: "https://solx.vercel.app",
              site_name: "Xzone",
              images: [
                {
                  url: "https://solx.vercel.app/logo.png",
                },
              ],
            }}
            twitter={{
              handle: "@Xzonesol",
              site: "https://solx.vercel.app",
              cardType: "summary_large_image",
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-w-7xl justify-between mx-auto flex lg:px-10 ">
              <div className="p-0 sm:p-10">
                <TheSidebar />
              </div>
              <main className="w-full flex flex-col">
                <div className="md:hidden border-b-200 w-full justify-between items-center px-6 py-2 flex bg-background fixed space-x-4"> 
                <Link href="/" passHref>
          <div className="text-sm md:text-4xl font-bold flex flex-row">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 md:w-16 md:h-16"
            />
          </div>
        </Link>
                  <div>
                  <ModeToggle />
                  <WalletMultiButton />
                  </div>
                </div>
                <Component {...pageProps} />
              </main>
              <div className="sticky top-0 p-10 hidden md:flex p-10 self-start">
                <PromoBar />
              </div>
            </div>

            <Toaster />
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
