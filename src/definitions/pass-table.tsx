import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { NearWallet } from '@/wallets/near-wallet'
import { create as createStore } from 'zustand'
import { useVaultStore } from '@/definitions/vault-table'
import { FrequencyTranslation } from '@/definitions/frequency'

interface Metadata {
  name: string
  frequency: number
  amount: number
}
export interface PassType {
  vaultId: string
  ownerId: string
  vaultName: string
  metadata: Metadata
}

interface PassStore {
  passes: PassType[]
  setPasses: (passes: PassType[]) => void
  getPasses: (
    wallet: NearWallet | undefined,
    contractId: string,
  ) => Promise<void>
}

export const usePassStore = createStore<PassStore>((set) => ({
  passes: [],
  setPasses: (passes) => set({ passes }),
  getPasses: async (wallet, contractId) => {
    if (!wallet) {
      console.log('Wallet not available yet')
      return
    }
    const vaultStore = useVaultStore.getState()
    let vaults = vaultStore.vaults

    // Check if vaults are loaded, if not, load them
    if (vaults.length === 0) {
      console.log('Loading vaults first...')
      vaults = await vaultStore.getVaults(wallet, contractId)
      console.log('Vaults Loaded', vaults)
    }

    try {
      const passesPromises = vaults.map(async (vault) => {
        console.log('vault.id: ' + vault.id)
        console.log('wallet.accountId: ' + wallet.accountId)
        const passes = await wallet.viewMethod({
          contractId: vault.id,
          method: 'nft_tokens_for_owner',
          args: {
            accountId: wallet.accountId,
            fromIndex: 0,
            limit: 10,
          },
        })
        return passes.map((pass: Omit<PassType, 'vaultId'>) => ({
          ...pass,
          vaultName: vault.name,
          vaultId: vault.id,
        }))
      })
      const passesResults = await Promise.all(passesPromises)
      const allPasses = passesResults.flat()

      set({ passes: allPasses })
    } catch (error) {
      console.error('Failed to fetch passes:', error)
    }
  },
}))

const columnHelper = createColumnHelper<PassType>()

export const passDefinition = () => {
  const { getFrequencyByNumber } = FrequencyTranslation()
  return [
    columnHelper.accessor('vaultName', {
      header: 'Vault Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('vaultId', {
      header: 'Vault Id',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('metadata.name', {
      header: 'Nft Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('metadata.amount', {
      header: 'Amount',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('metadata.frequency', {
      header: 'Frequency',
      cell: (props) => getFrequencyByNumber(props.getValue()),
    }),
  ] as Array<ColumnDef<unknown, PassType>>
}
