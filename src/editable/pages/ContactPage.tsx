'use client'

import { FileText, Mail, Megaphone, Radio } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Press releases', body: 'Send announcements, launch notes, corrections, and source material for distribution review.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss syndication, public relations campaigns, newsroom collaborations, and coverage needs.' },
  { icon: Mail, title: 'Account support', body: 'Get help with login, submissions, creator access, or site-related questions.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#090821]">
        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div className="editable-reveal">
              <p className="inline-flex rounded-full border border-[var(--slot4-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">Reach the right media distribution desk.</h1>
            </div>
            <p className="text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="bg-[#f8f9fd]">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-20">
            <aside className="grid gap-5">
              <div className="editable-dark-panel p-7">
                <div className="relative z-10">
                  <Radio className="h-8 w-8 text-[var(--slot4-accent)]" />
                  <h2 className="mt-6 text-3xl font-extrabold">Distribution signals, routed clearly.</h2>
                  <p className="mt-4 text-sm leading-7 text-white/68">Tell {SITE_CONFIG.name} what you are publishing, correcting, promoting, or requesting.</p>
                </div>
              </div>
              {desks.map((desk, index) => {
                const Icon = desk.icon
                return (
                  <div key={desk.title} className="editable-card editable-rise p-6" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[var(--slot4-accent)]" /><span className="text-xs font-black text-[#98a1b5]">0{index + 1}</span></div>
                    <h3 className="mt-5 text-2xl font-extrabold">{desk.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{desk.body}</p>
                  </div>
                )
              })}
            </aside>
            <div>
              <p className="text-sm font-black text-[var(--slot4-accent)]">Send a message</p>
              <h2 className="mt-3 text-4xl font-extrabold">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
