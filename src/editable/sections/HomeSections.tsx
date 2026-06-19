import Link from 'next/link'
import { ArrowRight, BadgeCheck, BarChart3, Megaphone, Radio, Search, Send, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function TextPostCard({ post, href, index, featured = false }: { post: SitePost; href: string; index: number; featured?: boolean }) {
  return (
    <Link
      href={href}
      className={`editable-card editable-rise group block p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-[0_22px_70px_rgba(124,47,242,.14)] ${featured ? 'bg-[#f7f3ff] md:col-span-2' : ''}`}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-black text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
        <span className="text-xs font-black text-[#98a1b5]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={`${featured ? 'text-3xl sm:text-4xl' : 'text-xl'} mt-5 line-clamp-3 font-extrabold leading-tight text-[#090821] group-hover:text-[var(--slot4-accent)]`}>{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, featured ? 210 : 150)}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#090821]">Read update <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: media distribution updates.`

  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-12 sm:py-16 lg:py-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div className="editable-reveal">
            <p className="inline-flex rounded-full border border-[var(--slot4-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
            <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-tight text-[#090821] sm:text-6xl lg:text-7xl">
              Media distribution that makes <span className="editable-highlight">every update</span> easier to find.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.accent}>{pagesContent.home.hero.primaryCta.label}<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/search" className={dc.button.secondary}>Search archive</Link>
            </div>
          </div>

          <div className="editable-dark-panel editable-rise min-h-[520px] p-5 sm:p-8">
            <div className="relative z-10 mx-auto mt-8 max-w-[720px] rounded-[1.1rem] bg-white p-5 text-[#090821] shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-[var(--slot4-border)] pb-4">
                <span className="text-sm font-black">{SITE_CONFIG.name}</span>
                <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-black text-[var(--slot4-accent)]">Live desk</span>
              </div>
              <div className="grid gap-4">
                {(lead ? [lead, ...posts.slice(1, 4)] : posts.slice(0, 4)).map((post, index) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group rounded-[1rem] border border-[var(--slot4-border)] bg-[#f8f9fd] p-4 transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:bg-white">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-black text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
                      <Radio className="h-4 w-4 text-[#98a1b5]" />
                    </div>
                    <h2 className="mt-2 line-clamp-2 text-lg font-extrabold leading-tight group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ['Press reach', '126K'],
                ['Coverage lanes', '18'],
                ['Active updates', String(posts.length || 0)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1rem] border border-white/10 bg-white/8 p-4">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-xs font-bold text-white/58">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 6)
  if (!railPosts.length) return null
  return (
    <section className="bg-[#f8f9fd]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[var(--slot4-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">Latest updates</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#090821] sm:text-5xl">Recently distributed media and public updates</h2>
          <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">Fresh posts from the master panel appear here automatically, with a clean reading rhythm and no mock-card substitution.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {railPosts.map((post, index) => <TextPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} featured={index === 0} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[6] || posts[0]
  const items = posts.slice(7, 11).length ? posts.slice(7, 11) : posts.slice(1, 5)
  if (!feature) return null
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="editable-dark-panel p-8 sm:p-10">
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80">Distribution workflow</p>
              <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">Publish, classify, distribute, and track newsroom signals.</h2>
              <p className="mt-5 text-base leading-8 text-white/68">The layout is tuned for media distribution: source-aware updates, concise summaries, category filters, and fast routes into each task detail page.</p>
              <Link href={postHref(primaryTask, feature, primaryRoute)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-black text-white">Open featured update <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              [Megaphone, 'Press releases', 'Make announcements clear, scannable, and ready for distribution.'],
              [BadgeCheck, 'Verified categories', 'Use dynamic categories from real posts and keep filtering visible.'],
              [BarChart3, 'Archive visibility', 'Surface latest posts in archive grids without falling back to mock cards.'],
              [Send, 'Creator flow', 'Authenticated users can access a polished publishing workspace.'],
            ].map(([Icon, title, body], index) => {
              const FeatureIcon = Icon as typeof Megaphone
              return (
                <div key={title as string} className="editable-card editable-rise p-7" style={{ animationDelay: `${index * 80}ms` }}>
                  <FeatureIcon className="h-7 w-7 text-[var(--slot4-accent)]" />
                  <h3 className="mt-6 text-2xl font-extrabold text-[#090821]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{body as string}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((post, index) => <TextPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index + 6} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = (collected.length ? collected : posts).slice(0, 8)
  if (!source.length) return null
  return (
    <section className="bg-[#f8f9fd]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="inline-flex rounded-full border border-[var(--slot4-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">Briefing room</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#090821] sm:text-5xl">Searchable sections for every distribution need.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">Browse by category, search the full archive, or move directly into the media distribution task page.</p>
          </div>
          <div className="grid gap-4">
            {source.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid gap-4 rounded-[1.1rem] border border-[var(--slot4-border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-xs font-black text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
                  <h3 className="mt-1 line-clamp-2 text-lg font-extrabold group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-[#98a1b5] transition group-hover:translate-x-1 group-hover:text-[var(--slot4-accent)] sm:block" />
              </Link>
            ))}
          </div>
        </div>

        <form action="/search" className="mt-14 grid gap-5 rounded-[1.1rem] border border-[var(--slot4-border)] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <h3 className="text-3xl font-extrabold text-[#090821]">Search the full archive</h3>
            <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Explore every {taskLabel(primaryTask).toLowerCase()} published by {SITE_CONFIG.name}.</p>
          </div>
          <label className="flex overflow-hidden rounded-full border border-[var(--slot4-border)] bg-[#f8f9fd] sm:min-w-[420px]">
            <Search className="ml-4 mt-4 h-4 w-4 text-[#7b8499]" />
            <input name="q" placeholder="Search media updates" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-[var(--slot4-accent)] px-5 text-sm font-black text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} pb-16 lg:pb-24`}>
        <div className="editable-dark-panel grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14">
          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80">Stay informed</p>
            <h2 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">Follow the media releases shaping public conversation.</h2>
          </div>
          <div className="relative z-10 flex flex-col justify-center">
            <p className="max-w-xl text-base leading-8 text-white/68">Fresh releases, newsroom perspectives, public relations updates, and media coverage in one focused distribution hub.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={dc.button.accent}>Send a tip <Sparkles className="h-4 w-4" /></Link>
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white hover:text-[#0c0a24]">Join the desk</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
