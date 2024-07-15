import React, { useEffect } from 'react'
import { useStore } from '@/wallets/useStore'
import { NearVaultsContract } from '@/config'
import { useVaultStore, vaultDefinition } from '@/definitions/vault-table'
import Table from '@/components/Table'

const CONTRACT = NearVaultsContract

export const VaultTable = () => {
  const { wallet } = useStore()
  const vaults = useVaultStore((state) => state.vaults)
  const getVaults = useVaultStore((state) => state.getVaults)

  useEffect(() => {
    getVaults(wallet, CONTRACT)
  }, [wallet, getVaults])

  return <Table data={vaults} columns={vaultDefinition} />
}
