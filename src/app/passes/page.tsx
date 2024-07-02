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
          <p className="mb-5 text-gray-600">
            Here you can find a list of your passes.
          </p>
          <PassTable />
        </div>
      </main>
    </>
  )
}

export default Passes
