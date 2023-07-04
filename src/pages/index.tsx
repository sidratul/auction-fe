import Image from 'next/image'
import { Inter } from 'next/font/google'
import { MainLayout } from '@/layouts'
import { ItemContainer } from '@/containers/Item'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>
      <ItemContainer/>
    </MainLayout>
  )
}
