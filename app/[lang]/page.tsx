import { getDictionary } from '../../getDictionary'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default async function Home({ 
  params 
}: { 
  params: Promise<{ lang: 'pt' | 'en' }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth">
      
      <Header lang={lang} dict={dict} />

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

      <Footer dict={dict} />

    </div>
  )
}