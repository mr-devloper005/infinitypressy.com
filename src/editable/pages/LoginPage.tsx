import type { Metadata } from 'next'
import Link from 'next/link'
import { Radio, ShieldCheck, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#090821]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1100px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-20">
          <div className="editable-dark-panel editable-reveal flex flex-col justify-center p-8 sm:p-10">
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-7 max-w-xl text-5xl font-extrabold leading-tight sm:text-6xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/70">{pagesContent.auth.login.description}</p>
              <div className="mt-8 grid gap-3">
                {[
                  [ShieldCheck, 'Protected creator access'],
                  [Radio, 'Reach the media distribution desk'],
                  [Sparkles, 'Continue publishing without losing context'],
                ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof ShieldCheck
                  return <p key={label as string} className="flex items-center gap-3 text-sm font-bold text-white/76"><ItemIcon className="h-4 w-4 text-[var(--slot4-accent)]" />{label as string}</p>
                })}
              </div>
            </div>
          </div>
          <div className="editable-card editable-rise flex flex-col justify-center p-7 sm:p-10">
            <p className="text-sm font-black text-[var(--slot4-accent)]">Member access</p>
            <h2 className="mt-3 text-4xl font-extrabold">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-[var(--slot4-border)] pt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
