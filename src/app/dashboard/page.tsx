'use client'

import Head from 'next/head'
import * as React from 'react'

import NearLogo from '~/svg/near.svg'
import { NextPage } from 'next'
import { DashboardTable } from '@/components/dashboard-table'

const Dashboard: NextPage = () => {
  return (
    <>
      <main>
        <div className="flex flex-col h-full">
          <h1 className="text-xl mb- font-semibold">Available Vaults</h1>
          <p className="mb-5 text-gray-600">
            Here you can find a list of available vaults. You can mint a Pass
            which is essentially an NFT to start using this vault.
          </p>
          <DashboardTable />
        </div>
      </main>
    </>
  )
}

export default Dashboard
