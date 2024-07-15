import React, { useEffect } from 'react'
import { useStore } from '@/wallets/useStore'
import { passDefinition, PassType } from '@/definitions/pass-table'
import { usePassStore } from '@/definitions/pass-table'
import Table from '@/components/Table'
import { NearVaultsContract } from '@/config'
const CONTRACT = NearVaultsContract

export const PassTable = () => {
  const { wallet } = useStore()
  const passes = usePassStore((state) => state.passes)
  const getPasses = usePassStore((state) => state.getPasses)

  useEffect(() => {
    getPasses(wallet, CONTRACT)
  }, [wallet, getPasses])

  return <Table data={passes} columns={passDefinition} />
}
