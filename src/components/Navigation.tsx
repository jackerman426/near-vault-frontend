import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NearLogo from '~/svg/near.svg'
import { useStore } from '@/wallets/useStore'
import { NearVaultsContract } from '@/config'
import { cn } from '@/app/lib/utils'

interface NavigationProps {
  links: Array<{
    label: string
    path: string
    svg: string
  }>
}

export const Navigation = ({ links }: NavigationProps) => {
  const pathname = usePathname()
  const { signedAccountId, wallet } = useStore()
  const [action, setAction] = useState<(() => void) | undefined>(undefined)
  const [label, setLabel] = useState('Loading...')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!wallet) return

    console.log('signedAccountId -> ' + signedAccountId)
    if (signedAccountId) {
      setAction(() => wallet.signOut)
      setLabel(`Logout ${signedAccountId}`)
    } else {
      setAction(() => wallet.signIn)
      setLabel('Login')
    }
  }, [signedAccountId, wallet, setAction, setLabel])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className="flex flex-col md:w-64 w-full md:h-screen px-5 py-8 overflow-y-auto bg-blue-500 md:flex-shrink-0">
      <div className="flex justify-between items-center">
        <a href="#">
          <NearLogo className="w-auto h-7" />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:flex flex-col justify-between flex-1 mt-8 ${isOpen ? 'block' : 'hidden'}`}
      >
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.path
              return (
                <li key={`${link.label}-${link.path}`} className="list-none">
                  <Link
                    className={cn(
                      'flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-blue-400',
                      isActive
                        ? 'text-black bg-blue-400'
                        : 'text-gray-600 dark:text-gray-200',
                    )}
                    href={link.path}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={link.svg}
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </div>
          <div className="space-y-3">
            <label className="px-3 text-xs text-white uppercase">Wallet</label>
            <a
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:text-white"
              href="#"
              onClick={action}
              style={{ cursor: 'pointer' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
              <span className="mx-2 text-sm font-light">{label}</span>
            </a>
          </div>
        </nav>
        <div className="justify-end py-4">
          <p className="text-xs">
            Loading components from: &nbsp;
            <code className="font-sans">{NearVaultsContract}</code>
          </p>
        </div>
      </div>
    </aside>
  )
}
