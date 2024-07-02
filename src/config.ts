const contractPerNetwork = {
  mainnet: '',
  testnet: 'jackerman.testnet',
}

export const NetworkId = 'testnet'
export const NearVaultsContract = contractPerNetwork[NetworkId]

export const GAS_FOR_MINT = '100' + '0'.repeat(12)
export const DEPOSIT_FOR_MINT = '700' + '0'.repeat(19)
