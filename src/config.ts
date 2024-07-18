const contractPerNetwork = {
  mainnet: '',
  testnet: 'jackerman.testnet',
}

export const NetworkId = 'testnet'
export const NearVaultsContract = contractPerNetwork[NetworkId]

export const DEPOSIT_FOR_VAULT = '7' + '0'.repeat(24) // 6N

export const GAS_FOR_VAULT = '300' + '0'.repeat(12) //, 300Tgas

export const GAS_FOR_MINT = '100' + '0'.repeat(12)
export const DEPOSIT_FOR_MINT = '700' + '0'.repeat(19)
