'use client'
import * as React from 'react'
import { NextPage } from 'next'
import { PassTable } from '@/components/PassTable'

const Passes: NextPage = () => {
  return (
    <>
      <main className="flex flex-col h-full p-4 md:p-8">
        <div className="flex flex-col h-full">
          <h1 className="text-xl mb-4 font-semibold">Passes</h1>
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <p>Here you can find a list of your passes.</p>
            {/* If you need a button here, add it similarly */}
          </div>
          <PassTable />
        </div>
      </main>
    </>
  )
}

export default Passes
