'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'

import { NearWallet } from '@/wallets/near-wallet'
import { useStore } from '@/wallets/useStore'
import { NearVaultsContract, NetworkId } from '@/config'
import * as React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { setWallet, setSignedAccountId } = useStore()

  useEffect(() => {
    const wallet = new NearWallet({
      networkId: NetworkId,
      createAccessKeyFor: NearVaultsContract,
    })

    async function initWallet() {
      try {
        await wallet.startUp(setSignedAccountId)
        setWallet(wallet)
      } catch (error) {
        console.error('Failed to initialize the wallet:', error)
      }
    }
    initWallet().then(() => console.info('wallet initialized'))
  }, [setSignedAccountId, setWallet])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
          <Navigation />
          {/*{children}*/}
          <div className="flex-grow p-4 md:p-24 overflow-auto text-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
