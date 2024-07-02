import React, { useEffect } from 'react'
import { useStore } from '@/wallets/useStore'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
import { NearVaultsContract } from '@/config'
import { useVaultStore, vaultDefinition } from '@/definitions/vault-table'

const CONTRACT = NearVaultsContract

export const VaultTable = () => {
  const { wallet } = useStore()
  const vaults = useVaultStore((state) => state.vaults)
  const getVaults = useVaultStore((state) => state.getVaults)

  useEffect(() => {
    getVaults(wallet, CONTRACT)
  }, [wallet, getVaults])

  const tableInstance = useReactTable({
    data: vaults,
    columns: vaultDefinition,
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
