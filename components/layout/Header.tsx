'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Dictionary } from '../../dictionary';
import type { Locale } from '../../i18n';

export default function Header({ lang, dict }: { lang: Locale, dict: Dictionary }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para gerar a URL de troca de idioma mantendo o path atual
  const getLanguagePath = (newLang: Locale) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split('/');
    segments[1] = newLang; // Substitui o primeiro segmento (o locale)
    return segments.join('/');
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const mobileMenuLabel = isMenuOpen ? dict.nav.closeMenu : dict.nav.menu;

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/45 backdrop-blur-xl">
        <header className="container mx-auto flex items-center justify-between px-6 py-5">
          <Link href={`/${lang}`} className="text-lg font-bold tracking-tight text-cyan-400 transition-opacity hover:opacity-80 md:text-xl">
            CyberSenpai<span className="text-white">Works</span>.
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <Link href={`/${lang}#projects`} className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">{dict.nav.projects}</Link>
            <Link href={`/${lang}#services`} className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">{dict.nav.services}</Link>
            <Link href={`/${lang}#about`} className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">{dict.nav.about}</Link>
            <Link href={`/${lang}/challenges`} className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300">{dict.nav.lab}</Link>
            <Link href={`/${lang}#contact`} className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">{dict.nav.contact}</Link>
            <div className="h-4 w-px bg-slate-700"></div>
            <Link href={getLanguagePath('pt')} className={`text-xs font-bold ${lang === 'pt' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>PT</Link>
            <Link href={getLanguagePath('en')} className={`text-xs font-bold ${lang === 'en' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>EN</Link>
            <div className="h-4 w-px bg-slate-700"></div>
            <a href="https://github.com/cybersenpaiworks" target="_blank" rel="noreferrer" className="text-sm text-slate-500 transition-colors hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/gabriel-r-vancini" target="_blank" rel="noreferrer" className="text-sm text-slate-500 transition-colors hover:text-cyan-400">
              LinkedIn
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuLabel}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-400 md:hidden"
          >
            <span>{mobileMenuLabel}</span>
            <span aria-hidden="true" className="text-cyan-400">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </header>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label={dict.nav.closeMenu}
            onClick={closeMenu}
            className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm"
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            className="fixed inset-x-6 top-24 z-40 rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.65)]"
          >
            <nav className="flex flex-col gap-3">
              <Link onClick={closeMenu} href={`/${lang}#projects`} className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-500/60 hover:text-cyan-400">
                {dict.nav.projects}
              </Link>
              <Link onClick={closeMenu} href={`/${lang}#services`} className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-500/60 hover:text-cyan-400">
                {dict.nav.services}
              </Link>
              <Link onClick={closeMenu} href={`/${lang}#about`} className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-500/60 hover:text-cyan-400">
                {dict.nav.about}
              </Link>
              <Link onClick={closeMenu} href={`/${lang}/challenges`} className="rounded-2xl border border-amber-500/30 bg-slate-800/70 px-4 py-3 text-sm font-medium text-amber-300 transition-colors hover:border-amber-400 hover:text-amber-200">
                {dict.nav.lab}
              </Link>
              <Link onClick={closeMenu} href={`/${lang}#contact`} className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-500/60 hover:text-cyan-400">
                {dict.nav.contact}
              </Link>
            </nav>

            <div className="my-5 h-px bg-slate-800"></div>

            <div className="grid grid-cols-2 gap-3">
              <Link onClick={closeMenu} href={getLanguagePath('pt')} className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold transition-colors ${lang === 'pt' ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 bg-slate-800/70 text-slate-300 hover:border-slate-600 hover:text-white'}`}>
                PT
              </Link>
              <Link onClick={closeMenu} href={getLanguagePath('en')} className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold transition-colors ${lang === 'en' ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 bg-slate-800/70 text-slate-300 hover:border-slate-600 hover:text-white'}`}>
                EN
              </Link>
            </div>

            <div className="my-5 h-px bg-slate-800"></div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/cybersenpaiworks"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-center text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-r-vancini"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-2xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-center text-sm font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
