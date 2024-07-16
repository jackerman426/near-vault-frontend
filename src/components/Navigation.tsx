//ICONS TAKEN FROM https://flowbite.com/icons/

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
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

  return (
    <aside className="flex flex-col w-full md:w-64 h-screen px-5 py-8 overflow-y-auto bg-blue-500 flex-shrink-0">
      <a href="#">
        <NearLogo className="w-auto h-7" />
      </a>
      <div className="flex flex-col justify-between flex-1 mt-8">
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
