import './globals.css'
import React from 'react'
import { Providers } from './provider'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Lawatty',
  description: 'Helps you manage better your time',
}
//commit
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <Analytics/>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}