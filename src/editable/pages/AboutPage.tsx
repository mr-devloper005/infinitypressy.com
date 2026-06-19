import Link from 'next/link'
import { ArrowRight, Globe2, Newspaper, Radio, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const values = [
  { icon: Newspaper, title: 'Media-first publishing', description: 'Announcements, press releases, coverage notes, and public updates are structured so readers can scan quickly and continue deeper.' },
  { icon: Radio, title: 'Distribution clarity', description: 'The site keeps routes, categories, and search surfaces aligned around real media distribution posts.' },
  { icon: ShieldCheck, title: 'Trust and context', description: 'Every page favors clear hierarchy, readable summaries, and task-specific detail pages that make updates feel credible.' },
]

export default function AboutPage() {
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || '/media-distribution'

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#090821]">
        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="editable-reveal">
              <p className="inline-flex rounded-full border border-[var(--slot4-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">A focused media distribution hub for public updates.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={mediaRoute} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-black text-white">Browse media updates <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-border)] bg-white px-7 py-3.5 text-sm font-black">Contact desk</Link>
              </div>
            </div>
            <div className="editable-dark-panel editable-rise p-8 sm:p-10">
              <div className="relative z-10">
                <Globe2 className="h-9 w-9 text-[var(--slot4-accent)]" />
                <h2 className="mt-8 text-4xl font-extrabold leading-tight">Built for press releases, public relations, and newsroom discovery.</h2>
                <p className="mt-5 text-base leading-8 text-white/70">Visitors can move from the homepage to archives, search, and detail pages without losing the thread of what was published and why it matters.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f9fd]">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="editable-card editable-rise p-7" style={{ animationDelay: `${index * 90}ms` }}>
                    <Icon className="h-7 w-7 text-[var(--slot4-accent)]" />
                    <h2 className="mt-6 text-2xl font-extrabold">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[1.1rem] border border-[var(--slot4-border)] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,.06)] sm:p-10">
            <p className="text-sm font-black text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-2">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-[var(--slot4-muted-text)]">{paragraph}</p>)}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
