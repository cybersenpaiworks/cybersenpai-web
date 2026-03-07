import { getDictionary } from '../../getDictionary'

export default async function Home({ params }: { params: { lang: 'pt' | 'en' } }) {
  const dict = await getDictionary(params.lang)
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth">
      
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-400 tracking-tighter">
          CyberSenpai<span className="text-white">Works</span>.
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#experiencia" className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.experience}</a>
          <a href="#laboratorio" className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.lab}</a>
          <a href="#contato" className="text-sm font-medium hover:text-cyan-400 transition-colors">{dict.nav.contact}</a>
          <div className="h-4 w-px bg-slate-700"></div>
          <a href="/pt" className={`text-xs font-bold ${params.lang === 'pt' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>PT</a>
          <a href="/en" className={`text-xs font-bold ${params.lang === 'en' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>EN</a>
          <div className="h-4 w-px bg-slate-700"></div>
          <a href="https://github.com/cybersenpaiworks" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/gabriel-r-vancini" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          {dict.hero.title1} <br />
          {dict.hero.title2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{dict.hero.titleHighlight}</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl">
          {dict.hero.subtitle}
        </p>
        <a href="#contato" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-3 px-8 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          {dict.hero.cta}
        </a>
      </main>

      {/* Services Grid */}
      <section className="bg-slate-800/30 py-20 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">{dict.expertise.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="text-cyan-400 text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">{dict.expertise.webTitle}</h3>
              <p className="text-slate-400">{dict.expertise.webDesc}</p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="text-cyan-400 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">{dict.expertise.mobileTitle}</h3>
              <p className="text-slate-400">{dict.expertise.mobileDesc}</p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="text-cyan-400 text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">{dict.expertise.devopsTitle}</h3>
              <p className="text-slate-400">{dict.expertise.devopsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência Profissional */}
      <section id="experiencia" className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{dict.experience.title}</h2>
          <div className="space-y-6">
            <div className="p-8 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400">{dict.experience.climatempoTitle}</h3>
                  <p className="text-slate-300 font-medium">{dict.experience.climatempoRole}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{dict.experience.climatempoDesc}</p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Next.js</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">PHP/Twig</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">WordPress API</span>
              </div>
            </div>

            <div className="p-8 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
              <h3 className="text-xl font-bold text-cyan-400">{dict.experience.agroclimaTitle}</h3>
              <p className="text-slate-300 font-medium mb-4">{dict.experience.agroclimaRole}</p>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{dict.experience.agroclimaDesc}</p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Next.js 12/15</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Kubernetes</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos Pessoais */}
      <section id="laboratorio" className="py-20 bg-slate-800/30 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">{dict.lab.title}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">{dict.lab.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-500 text-xs font-bold px-2 py-1 rounded">{dict.lab.badgeSoon}</div>
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-3xl mb-4">📰</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{dict.lab.newsTitle}</h3>
                  <p className="text-slate-400 text-sm mb-6">{dict.lab.newsDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                  <span className="bg-slate-900 px-2 py-1 rounded">Python</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">FastAPI</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">BeautifulSoup</span>
                </div>
              </div>
            </div>

            <div className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-500 text-xs font-bold px-2 py-1 rounded">{dict.lab.badgeActive}</div>
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-3xl mb-4">🖥️</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{dict.lab.aiTitle}</h3>
                  <p className="text-slate-400 text-sm mb-6">{dict.lab.aiDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                  <span className="bg-slate-900 px-2 py-1 rounded">Docker</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">Nginx Proxy</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">Ollama</span>
                </div>
              </div>
            </div>

            <div className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-500 text-xs font-bold px-2 py-1 rounded">{dict.lab.badgeWip}</div>
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-3xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{dict.lab.tcgTitle}</h3>
                  <p className="text-slate-400 text-sm mb-6">{dict.lab.tcgDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                  <span className="bg-slate-900 px-2 py-1 rounded">Next.js</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">Tailwind CSS</span>
                  <span className="bg-slate-900 px-2 py-1 rounded">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contato" className="container mx-auto px-6 py-20 text-center border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-6">{dict.footer.title}</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">{dict.footer.subtitle}</p>
        <a href="mailto:contato@cybersenpaiworks.com.br" className="inline-block text-2xl font-bold text-cyan-400 hover:text-cyan-300 hover:-translate-y-1 transition-all">
          contato@cybersenpaiworks.com.br
        </a>
        <div className="mt-16 text-slate-600 text-sm">
          &copy; {currentYear} {dict.footer.rights} <br />
          {dict.footer.location}
        </div>
      </footer>

    </div>
  )
}