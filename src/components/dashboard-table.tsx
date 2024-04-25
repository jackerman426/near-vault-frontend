import React, { useEffect, useState } from 'react'
import { useStore } from '@/wallets/useStore'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
import { NearVaultsContract } from '@/config'
import { vaultDefinition, VaultType } from '@/app/utils/table.definitions'

const CONTRACT = NearVaultsContract

export const DashboardTable = () => {
  const [vaults, setVaults] = useState<VaultType[]>([])
  const { wallet } = useStore()

  useEffect(() => {
    if (!wallet) {
      console.log('Wallet not available yet')
      return
    }

    async function getVaults() {
      try {
        if (wallet) {
          const data = await wallet.viewMethod({
            contractId: CONTRACT,
            method: 'view_vaults',
          })
          console.log(data)
          setVaults(data)
        }
      } catch (error) {
        console.error('Failed to fetch vaults:', error)
      }
    }

    getVaults()
  }, [wallet])

  const tableInstance = useReactTable({
    data: vaults,
    columns: vaultDefinition,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="flex-col">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      colSpan={header.colSpan}
                      key={header.id}
                      className="border-2 p-3"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="border-2 p-2 ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
