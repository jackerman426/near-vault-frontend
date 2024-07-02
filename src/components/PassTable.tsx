import React, { useEffect } from 'react'
import { useStore } from '@/wallets/useStore'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
import { passDefinition, PassType } from '@/definitions/pass-table'
import { usePassStore } from '@/definitions/pass-table'
import { NearVaultsContract } from '@/config'
const CONTRACT = NearVaultsContract

export const PassTable = () => {
  const { wallet } = useStore()
  const passes = usePassStore((state) => state.passes)
  const getPasses = usePassStore((state) => state.getPasses)

  useEffect(() => {
    getPasses(wallet, CONTRACT)
  }, [wallet, getPasses])

  const tableInstance = useReactTable({
    data: passes,
    columns: passDefinition,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="flex-col overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  colSpan={header.colSpan}
                  key={header.id}
                  className="border-2 p-3 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-2 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
