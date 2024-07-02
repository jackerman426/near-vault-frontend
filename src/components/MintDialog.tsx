import { Dialog, Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { useStore } from '@/wallets/useStore'
import { DEPOSIT_FOR_MINT, GAS_FOR_MINT } from '@/config'

interface MintDialogProps {
  id: string
}

export default function MintDialog({ id }: MintDialogProps) {
  let [isOpen, setIsOpen] = useState(false)
  const [passName, setPassName] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const { wallet } = useStore()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setPassName(event.target.value)
  }

  async function mint() {
    setShowSpinner(true)

    try {
      if (wallet) {
        await wallet.callMethod({
          contractId: id,
          method: 'nft_mint',
          args: {
            name: passName,
          },
          gas: GAS_FOR_MINT,
          deposit: DEPOSIT_FOR_MINT,
        })
      }
    } catch (error) {
      console.error('Failed to mint pass:', error)
    }
    setShowSpinner(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function handleMint(e: { preventDefault: () => void }) {
    e.preventDefault()
    await mint()
    closeModal()
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Mint
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Name your Pass
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You can give a unique name for the Pass that you are gonna
                      mint for this Vault.
                    </p>
                  </div>

                  <div className="mt-4">
                    <input
                      type="text"
                      value={passName}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md text-sm px-3 py-2 text-gray-900 w-full"
                      placeholder="Enter pass name"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleMint}
                      disabled={!passName}
                    >
                      Mint
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
