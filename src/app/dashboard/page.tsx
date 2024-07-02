'use client'
import * as React from 'react'

import { NextPage } from 'next'
import { VaultTable } from '@/components/VaultTable'

const Dashboard: NextPage = () => {
  return (
    <>
      <main className="flex flex-col h-full p-4 md:p-8">
        <div className="flex flex-col h-full">
          <h1 className="text-xl mb-4 font-semibold">Available Vaults</h1>
          <p className="mb-5 text-gray-600">
            Here you can find a list of available vaults. You can mint a Pass
            which is essentially an NFT to start using this vault.
          </p>
          <VaultTable />
        </div>
      </main>
    </>
  )
}

export default Dashboard
