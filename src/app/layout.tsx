import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מימור - מערכת לניהול חומרי הוראה',
  description: 'מערכת לניהול וארגון חומרי הוראה על ציר זמן שנתי',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className} style={{ margin: 0 }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 