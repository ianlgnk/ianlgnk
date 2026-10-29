import { DocumentMetaSync } from '@/components/DocumentMetaSync'
import { Header } from '@/components/Header'

import { cn, sectionShell } from '@/lib/utils'

export function Home() {
  return (
    <>
      <DocumentMetaSync page="home" />
      <Header current="home" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className={cn('py-16', sectionShell)}>Home</div>
      </main>
    </>
  )
}
