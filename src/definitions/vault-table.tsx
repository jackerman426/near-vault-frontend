import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import MintDialog from '@/components/MintDialog'
import { create as createStore } from 'zustand'
import { NearWallet } from '@/wallets/near-wallet'

export interface VaultType {
  accountId: string
  id: string
  name: string
  frequency: number
  amount: number
  mint(): any
}

interface VaultStore {
  vaults: VaultType[]
  setVaults: (vaults: VaultType[]) => void
  getVaults: (
    wallet: NearWallet | undefined,
    contractId: string,
  ) => Promise<VaultType[]>
}

export const useVaultStore = createStore<VaultStore>((set) => ({
  vaults: [],
  setVaults: (vaults) => set({ vaults }),
  getVaults: async (wallet, contractId) => {
    if (!wallet) {
      console.log('Wallet not available yet')
      return
    }
    try {
      const data = await wallet.viewMethod({
        contractId: contractId,
        method: 'view_vaults',
      })
      set({ vaults: data })
      return data
    } catch (error) {
      console.error('Failed to fetch vaults:', error)
      return []
    }
  },
}))

const columnHelper = createColumnHelper<VaultType>()

export const vaultDefinition = [
  columnHelper.accessor('accountId', {
    header: 'Owner',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('frequency', {
    header: 'Frequency',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount (N)',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('id', {
    header: 'Contract id',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('mint', {
    header: 'Pass',
    cell: (props) => {
      const id = props.row.original.id
      return <MintDialog id={id} />
    },
  }),
] as Array<ColumnDef<unknown, VaultType>>
