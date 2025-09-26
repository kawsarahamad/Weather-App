import type { Metadata } from 'next'
import './globals.css'
import { inter } from './fonts/inter'
export const metadata: Metadata = { title: 'Weather Today', description: "How's the sky looking today?" }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={inter.className}>{children}</body></html>)
}
