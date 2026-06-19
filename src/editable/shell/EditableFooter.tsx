'use client'

import Link from 'next/link'
import { ArrowRight, Facebook, Globe2, Instagram, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || '/media-distribution'

  return (
    <footer className="bg-[#0c0a24] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-14 overflow-hidden rounded-[1.1rem] bg-white text-[#090821]">
          <div className="editable-dark-panel grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_.85fr] lg:p-14">
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-black text-white/80">Media distribution desk</p>
              <h2 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">Build stronger reach with every published update.</h2>
            </div>
            <div className="relative z-10 flex flex-col justify-center">
              <p className="text-base leading-8 text-white/72">Use the archive to discover press releases, newsroom notes, public relations updates, and distributed media coverage from {SITE_CONFIG.name}.</p>
              <Link href={mediaRoute} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-black text-white">Browse updates <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_.7fr_.7fr_.7fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-2xl font-black">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white shadow-[0_8px_24px_rgba(0,0,0,.2)]">
                <img src="/favicon.ico" alt="" className="h-6 w-6 object-contain" />
              </span>
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <form action="/signup" className="mt-8 flex max-w-xl overflow-hidden rounded-full border border-white/15 bg-white/8">
              <input name="email" type="email" placeholder="Email for media updates" className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-white/40" />
              <button className="bg-[var(--slot4-accent)] px-5 text-sm font-black">Join</button>
            </form>
            
          </div>

          <div>
            <h3 className="pb-3 text-base font-black text-white">Explore</h3>
            <div className="mt-4 grid gap-3">
              <Link href={mediaRoute} className="group inline-flex items-center justify-between text-sm font-semibold text-white/62 hover:text-white">Media Distribution<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/search" className="text-sm font-semibold text-white/62 hover:text-white">Search archive</Link>
              <Link href="/create" className="text-sm font-semibold text-white/62 hover:text-white">Create post</Link>
            </div>
          </div>

          <div>
            <h3 className="pb-3 text-base font-black text-white">Publication</h3>
            <div className="mt-4 grid gap-3">
              <Link href="/about" className="text-sm font-semibold text-white/62 hover:text-white">About</Link>
              <Link href="/contact" className="text-sm font-semibold text-white/62 hover:text-white">Contact</Link>
              {session ? (
                <>
                  <Link href="/create" className="text-sm font-semibold text-white/62 hover:text-white">Publish</Link>
                  <button onClick={logout} className="text-left text-sm font-semibold text-white/62 hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-white/62 hover:text-white">Log in</Link>
                  <Link href="/signup" className="text-sm font-semibold text-white/62 hover:text-white">Sign up</Link>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="pb-3 text-base font-black text-white">Distribution</h3>
            <div className="mt-4 grid gap-3">
              <span className="text-sm font-semibold text-white/62">Press releases</span>
              <span className="text-sm font-semibold text-white/62">News media</span>
              <span className="text-sm font-semibold text-white/62">Public relations</span>
              <span className="text-sm font-semibold text-white/62">Media coverage</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/48">© {year} {SITE_CONFIG.name}. Media distribution and public information.</div>
    </footer>
  )
}
