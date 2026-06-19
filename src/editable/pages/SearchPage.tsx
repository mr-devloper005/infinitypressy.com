import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link href={href} className="editable-card editable-rise group block p-6 transition hover:-translate-y-1 hover:border-[var(--slot4-accent)]" style={{ animationDelay: `${Math.min(index, 9) * 55}ms` }}>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-black text-[var(--slot4-accent)]">{taskLabel}</span>
        <span className="text-xs font-black text-[#98a1b5]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2 className="mt-5 line-clamp-3 text-2xl font-extrabold leading-tight text-[#090821] group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
      {summary ? <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black opacity-70 group-hover:opacity-100">Open result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : []
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || '/media-distribution'

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[#090821]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded-[1.1rem] border border-[var(--slot4-border)] bg-white shadow-[0_18px_60px_rgba(15,23,42,.06)] md:grid-cols-[0.8fr_1.2fr]">
            <div className="editable-dark-panel rounded-none p-7 text-white sm:p-10 lg:p-14">
              <p className="relative z-10 text-xs font-black uppercase tracking-[0.28em]">{pagesContent.search.hero.badge}</p>
              <h1 className="relative z-10 mt-5 text-5xl font-extrabold leading-tight sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="relative z-10 mt-6 max-w-xl text-base font-semibold leading-8 text-white/75">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-center p-6 sm:p-10 lg:p-14">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-full border border-[var(--slot4-border)] bg-[#f8f9fd] px-4 py-3">
                <Search className="h-5 w-5 opacity-45" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-current/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-2xl border border-[var(--slot4-border)] bg-[#f8f9fd] px-4 py-3">
                  <Filter className="h-4 w-4 opacity-45" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-2xl border border-[var(--slot4-border)] bg-[#f8f9fd] px-4 py-3 text-sm font-black outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--slot4-accent)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0c0a24]" type="submit">Search</button>
            </form>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 py-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] opacity-50">{results.length} results</p>
              <h2 className="mt-2 text-4xl font-extrabold">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href={mediaRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-border)] bg-white px-5 py-3 text-sm font-black">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[1.1rem] border border-dashed border-[var(--slot4-border)] bg-white p-10 text-center">
              <p className="text-2xl font-black tracking-[-0.04em]">No matching posts found.</p>
              <p className="mt-3 text-sm font-semibold opacity-60">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
