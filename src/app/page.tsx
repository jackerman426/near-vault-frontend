import Dashboard from '@/app/dashboard/page'
import { type NextPage } from 'next'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Near Vault',
  description: 'Generated by create next app',
}
const Home: NextPage = () => {
  return (
    <main>
      <Dashboard />
    </main>
  )
}

export default Home
