'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ lang, dict }: { lang: 'pt' | 'en', dict: Record<string, Record<string, string>> }) {
  const pathname = usePathname();

  // Função para gerar a URL de troca de idioma mantendo o path atual
  const getLanguagePath = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split('/');
    segments[1] = newLang; // Substitui o primeiro segmento (o locale)
    return segments.join('/');
  };

  return (
    <header className="container mx-auto px-6 py-8 flex justify-between items-center">
      <Link href={`/${lang}`} className="text-2xl font-bold text-cyan-400 tracking-tighter hover:opacity-80 transition-opacity">
        CyberSenpai<span className="text-white">Works</span>.
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href={`/${lang}#experiencia`} className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.experience}</Link>
        <Link href={`/${lang}#laboratorio`} className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.lab}</Link>
        <Link href={`/${lang}/challenges`} className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">{dict.nav.challenges}</Link>
        <Link href={`/${lang}#contato`} className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.contact}</Link>
        <div className="h-4 w-px bg-slate-700"></div>
        <Link href={getLanguagePath('pt')} className={`text-xs font-bold ${lang === 'pt' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>PT</Link>
        <Link href={getLanguagePath('en')} className={`text-xs font-bold ${lang === 'en' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>EN</Link>
        <div className="h-4 w-px bg-slate-700"></div>
        <a href="https://github.com/cybersenpaiworks" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/gabriel-r-vancini" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
          LinkedIn
        </a>
      </nav>
    </header>
  );
}