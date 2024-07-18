import { Dialog, Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { useStore } from '@/wallets/useStore'
import {
  DEPOSIT_FOR_MINT,
  GAS_FOR_MINT,
  DEPOSIT_FOR_VAULT,
  NearVaultsContract,
  GAS_FOR_VAULT,
} from '@/config'

const CONTRACT = NearVaultsContract

type VaultDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function VaultDialog({ isOpen, onClose }: VaultDialogProps) {
  const [vaultName, setVaultName] = useState('')
  const [vaultFrequency, setVaultFrequency] = useState('')
  const [vaultAmount, setVaultAmount] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const { wallet } = useStore()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    if (name === 'vaultName') setVaultName(value)
    else if (name === 'vaultFrequency') setVaultFrequency(value)
    else if (name === 'vaultAmount') setVaultAmount(value)
  }

  async function create() {
    setShowSpinner(true)

    try {
      if (wallet) {
        await wallet.callMethod({
          contractId: CONTRACT,
          method: 'create_vault',
          args: {
            name: vaultName,
            frequency: Number(vaultFrequency),
            amount: Number(vaultAmount),
          },
          gas: GAS_FOR_VAULT,
          deposit: DEPOSIT_FOR_VAULT,
        })
      }
    } catch (error) {
      console.error('Failed to create vault:', error)
    }
    setShowSpinner(false)
  }

  async function handleCreate(e: { preventDefault: () => void }) {
    e.preventDefault()
    await create()
    onClose()
  }

  const isFormValid = () => {
    const frequency = Number(vaultFrequency)
    const amount = Number(vaultAmount)
    return (
      vaultName.trim() !== '' && amount > 0 && frequency >= 0 && frequency <= 4
    )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Vault
                </Dialog.Title>

                <form onSubmit={handleCreate}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      Name of the vault
                    </p>
                    <input
                      type="text"
                      name="vaultName"
                      value={vaultName}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md text-sm px-3 py-2 text-gray-900 w-full"
                      placeholder="Enter vault name"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      The payment frequency of this vault (0-4)
                    </p>
                    <input
                      type="number"
                      name="vaultFrequency"
                      value={vaultFrequency}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md text-sm px-3 py-2 text-gray-900 w-full"
                      placeholder="Enter frequency"
                      min="0"
                      max="4"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount (N)
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      The amount this vault should be paid (positive number)
                    </p>
                    <input
                      type="number"
                      name="vaultAmount"
                      value={vaultAmount}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md text-sm px-3 py-2 text-gray-900 w-full"
                      placeholder="Enter amount in near"
                      min="1"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={!isFormValid()}
                    >
                      {showSpinner ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
