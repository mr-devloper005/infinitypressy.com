'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, FileText, ImageIcon, Lock, Megaphone, Newspaper, PlusCircle, Radio, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-2xl border border-[var(--slot4-border)] bg-white px-4 py-3 text-sm font-bold text-[#090821] outline-none transition placeholder:text-[#7b8499] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-white px-4 py-14 text-[#090821] sm:px-6 lg:px-8 lg:py-20">
          <section className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="editable-dark-panel editable-reveal flex min-h-80 items-center justify-center p-8">
              <div className="relative z-10 grid h-32 w-32 place-items-center rounded-[2rem] bg-white/10">
                <Lock className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="editable-card editable-rise self-center p-7 sm:p-10">
              <p className="inline-flex rounded-full border border-[var(--slot4-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-black text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-border)] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[#090821]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[.86fr_1.14fr]">
            <aside className="editable-dark-panel editable-reveal p-8 sm:p-10 lg:sticky lg:top-28 lg:self-start">
              <div className="relative z-10">
                <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80">{pagesContent.create.hero.badge}</p>
                <h1 className="mt-7 text-5xl font-extrabold leading-tight sm:text-6xl">{pagesContent.create.hero.title}</h1>
                <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/70">{pagesContent.create.hero.description}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    [Newspaper, 'News-ready copy'],
                    [Megaphone, 'Distribution details'],
                    [BadgeCheck, 'Category context'],
                  ].map(([Icon, label]) => {
                    const ItemIcon = Icon as typeof Newspaper
                    return <div key={label as string} className="rounded-[1rem] border border-white/10 bg-white/8 p-4"><ItemIcon className="h-5 w-5 text-[var(--slot4-accent)]" /><p className="mt-3 text-sm font-black">{label as string}</p></div>
                  })}
                </div>
              </div>
              <div className="relative z-10 mt-8 rounded-[1rem] border border-white/10 bg-white/8 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-white"><Radio className="h-4 w-4 text-[var(--slot4-accent)]" /> Signed in as {session.name}</p>
              </div>
            </aside>

            <div className="grid gap-6">
              <div className="editable-card editable-rise p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[var(--slot4-accent)]">Content type</p>
                    <h2 className="mt-1 text-3xl font-extrabold">Choose where this update belongs</h2>
                  </div>
                  <span className="rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-sm font-black text-[var(--slot4-accent)]">{activeTask?.label || 'Media Distribution'}</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent)] text-white shadow-[0_14px_34px_rgba(124,47,242,.22)]' : 'border-[var(--slot4-border)] bg-[#f8f9fd] hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-65">{item.description}</span>
                    </button>
                  )
                })}
                </div>
              </div>

            <form onSubmit={submit} className="editable-card editable-rise p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[var(--slot4-accent)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-3xl font-extrabold">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-[#f8f9fd] px-4 py-2 text-sm font-black">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--slot4-accent)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0c0a24]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
