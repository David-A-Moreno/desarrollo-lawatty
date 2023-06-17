import './globals.css'
import React from 'react'
import { Providers } from './provider'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Lawatty',
  description: 'Helps you manage better your time',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}