import { create as createStore } from 'zustand'
import { NearWallet } from '@/wallets/near-wallet'

type FrequencyMap = { [key: number]: string }

interface FrequencyStore {
  frequencyMap: FrequencyMap
  setFrequencyMap: (frequencyMap: FrequencyMap) => void
  getFrequencyMap: (
    wallet: NearWallet | undefined,
    contractId: string,
  ) => Promise<void>
  // getFrequencyByNumber: (frequency: number) => string
}

export const useFrequencyStore = createStore<FrequencyStore>((set) => ({
  frequencyMap: {},
  setFrequencyMap: (frequencyMap) => set({ frequencyMap }),
  getFrequencyMap: async (wallet, contractId) => {
    if (!wallet) {
      console.log('Wallet not available yet')
      return
    }
    try {
      const data = await wallet.viewMethod({
        contractId: contractId,
        method: 'view_frequency_map',
      })
      set({ frequencyMap: data })
    } catch (error) {
      console.error('Failed to fetch frequency map:', error)
    }
  },
}))

export const FrequencyTranslation = () => {
  const frequencyMap = useFrequencyStore((state) => state.frequencyMap)

  const getFrequencyByNumber = (frequency: number) => {
    return frequencyMap[frequency] || 'Unknown'
  }

  return { getFrequencyByNumber }
}
