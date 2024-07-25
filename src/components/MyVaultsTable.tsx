import React, { useEffect } from 'react'
import { useStore } from '@/wallets/useStore'
import { NearVaultsContract } from '@/config'
import { useVaultStore, myVaultDefinition } from '@/definitions/vault-table'
import Table from '@/components/Table'

const CONTRACT = NearVaultsContract

export const MyVaultsTable = () => {
  const { wallet } = useStore()
  const myVaults = useVaultStore((state) => state.myVaults)
  const getMyVaults = useVaultStore((state) => state.getMyVaults)

  useEffect(() => {
    getMyVaults(wallet, CONTRACT)
  }, [wallet, getMyVaults])

  const columns = myVaultDefinition()

  return (
    <div>
      <Table data={myVaults} columns={columns} />
    </div>
  )
}
