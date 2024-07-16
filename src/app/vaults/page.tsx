'use client'
import * as React from 'react'
import { NextPage } from 'next'
import { MyVaultsTable } from '@/components/MyVaultsTable'

const Vaults: NextPage = () => {
  return (
    <>
      <main className="flex flex-col h-full p-4 md:p-8">
        <div className="flex flex-col h-full">
          <h1 className="text-xl mb-4 font-semibold">Available Vaults</h1>
          <div className="mb-5 text-gray-600">
            <p>Here you can find a list of your vaults.</p>
          </div>
          <div className="mb-5 flex justify-end">
            <button className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Create
            </button>
          </div>
          <MyVaultsTable />
        </div>
      </main>
    </>
  )
}

export default Vaults
