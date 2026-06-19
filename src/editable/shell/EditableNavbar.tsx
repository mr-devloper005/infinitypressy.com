'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogOut, Menu, PenLine, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || '/media-distribution'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--slot4-border)] bg-white/92 text-[#090821] backdrop-blur-xl">
      <div className="mx-auto grid min-h-[76px] max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--slot4-border)] lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-xl font-black">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--slot4-border)] bg-white shadow-[0_8px_20px_rgba(12,10,36,.08)]">
              <img src="/favicon.ico" alt="" className="h-5 w-5 object-contain" />
            </span>
            <span className="max-w-[42vw] truncate">{SITE_CONFIG.name}</span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-7 text-sm font-bold lg:flex">
          <Link href="/" className="hover:text-[var(--slot4-accent)]">Home</Link>
          <Link href={mediaRoute} className="hover:text-[var(--slot4-accent)]">Media Distribution</Link>
          <Link href="/search" className="hover:text-[var(--slot4-accent)]">Search</Link>
          <Link href="/about" className="hover:text-[var(--slot4-accent)]">About</Link>
          <Link href="/contact" className="hover:text-[var(--slot4-accent)]">Contact</Link>
        </nav>

        <div className="flex items-center justify-end gap-4">
          {session ? (
            <>
              <span className="hidden max-w-[140px] items-center gap-2 truncate rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-sm font-black text-[var(--slot4-accent)] sm:inline-flex"><UserRound className="h-4 w-4" /> {session.name}</span>
              <button type="button" onClick={logout} className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--slot4-border)] text-[#090821] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex" aria-label="Logout"><LogOut className="h-4 w-4" /></button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden text-sm font-bold hover:text-[var(--slot4-accent)] sm:block">Log in</Link>
              <Link href="/signup" className="hidden rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(124,47,242,.2)] transition hover:-translate-y-0.5 sm:block">Sign up</Link>
            </>
          )}
          <Link href={session ? '/create' : '/search'} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0c0a24] text-white transition hover:bg-[var(--slot4-accent)]" aria-label={session ? 'Create post' : 'Search'}>
            {session ? <PenLine className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--slot4-border)] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, { label: 'Media Distribution', href: mediaRoute }, { label: 'Search', href: '/search' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: session.name, href: '/create' }, { label: 'Logout', href: '#' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              item.label === 'Logout'
                ? <button key={item.label} onClick={() => { logout(); setOpen(false) }} className="rounded-2xl bg-[#f6f3ff] px-4 py-3 text-left text-sm font-black">Logout</button>
                : <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl bg-[#f6f3ff] px-4 py-3 text-sm font-black">{item.label}</Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
