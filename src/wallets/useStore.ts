import { create as createStore } from 'zustand'
import { NearWallet } from '@/wallets/near-wallet'

// Define the shape of your store
interface StoreState {
  wallet?: NearWallet
  signedAccountId: string
  setWallet: (wallet: NearWallet) => void
  setSignedAccountId: (signedAccountId: string | undefined) => void
}

export const useStore = createStore<StoreState>((set) => ({
  wallet: undefined,
  signedAccountId: '',
  setWallet: (wallet) => set({ wallet }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId }),
}))
