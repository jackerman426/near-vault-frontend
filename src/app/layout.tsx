'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import {useEffect} from "react";
import { Navigation } from "@/components/navigation"

import {NearWallet} from "@/wallets/near-wallet";
import { useStore } from "@/wallets/useStore";
import {NearVaultsContract, NetworkId} from "@/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { setWallet, setSignedAccountId } = useStore()

    useEffect(() => {
        const wallet = new NearWallet({networkId: NetworkId, createAccessKeyFor: NearVaultsContract })

        async function initWallet() {
            try {
                await wallet.startUp(setSignedAccountId)
                setWallet(wallet)
            } catch (error) {
                console.error('Failed to initialize the wallet:', error);
            }
        }
        initWallet().then(()=>console.info('wallet initialized'))
    }, [setSignedAccountId, setWallet]);

    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="flex dark:text-slate-400 dark:bg-gray-900 dark:border-gray-700">
            <Navigation/>
            <div className="p-8">{children}</div>
        </div></body>
        </html>
    );
}
