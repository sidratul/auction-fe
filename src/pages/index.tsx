import Image from 'next/image'
import { Inter } from 'next/font/google'
import { MainLayout } from '@/layouts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>
      <h1 className='mb-10'>dwwee</h1>
    </MainLayout>
  )
}
