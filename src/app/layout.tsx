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

const links = [
  {
    label: 'Dashboard',
    path: '/',
    svg: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
  },
  {
    label: 'Vaults',
    path: '/vaults',
    svg: 'M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z',
  },
  {
    label: 'Passes',
    path: '/passes',
    svg: 'M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm5.178 12.137a4.137 4.137 0 1 1 1.036-8.144A6.113 6.113 0 0 0 8.726 12c0 1.531.56 2.931 1.488 4.006a4.114 4.114 0 0 1-1.036.131ZM10.726 12c0-1.183.496-2.252 1.294-3.006A4.125 4.125 0 0 1 13.315 12a4.126 4.126 0 0 1-1.294 3.006A4.126 4.126 0 0 1 10.726 12Zm4.59 0a6.11 6.11 0 0 1-1.489 4.006 4.137 4.137 0 1 0 0-8.013A6.113 6.113 0 0 1 15.315 12Z',
  },
]

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
          <Navigation links={links} />
          {/*{children}*/}
          <div className="flex-grow p-4 md:p-24 overflow-auto text-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
