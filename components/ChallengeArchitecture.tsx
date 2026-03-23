'use client';

import { useState } from 'react';

export default function ChallengeArchitecture({ dict, lang }: { dict: Record<string, Record<string, string>>, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || 'dev';
  const buildDate = process.env.NEXT_PUBLIC_BUILD_TIME 
    ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US') 
    : '---';

  return (
    <div className="mt-12 bg-slate-800/20 rounded-2xl border border-slate-800 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-800/40 transition-colors group text-left"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-white leading-none mb-1">{dict.infra.button}</h3>
            <p className="text-xs text-slate-500 font-mono tracking-wider">VERSION: {commitHash}</p>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-slate-500"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-8 border-t border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Pipeline Visual */}
            <div className="space-y-8">
              <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                {dict.infra.pipeline}
              </h4>
              
              <div className="relative pl-8 space-y-12 border-l-2 border-slate-800 ml-2">
                
                {/* Repositorio */}
                <div className="relative">
                   <div className="absolute -left-[41px] top-0 p-1.5 bg-slate-900 rounded-full border-2 border-slate-800 text-slate-400">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                   </div>
                   <p className="text-xs font-bold text-slate-500 uppercase">{dict.infra.source}</p>
                   <p className="text-sm font-medium">{dict.infra.serviceRepo}</p>
                </div>

                {/* Github Actions */}
                <div className="relative">
                   <div className="absolute -left-[41px] top-0 p-1.5 bg-slate-900 rounded-full border-2 border-slate-800 text-cyan-500">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="m16 8-4 4-4-4"/><path d="M22 12A10 10 0 0 1 12 22"/><path d="M2 12a10 10 0 0 1 10-10"/></svg>
                   </div>
                   <p className="text-xs font-bold text-slate-500 uppercase">{dict.infra.ci}</p>
                   <p className="text-sm font-medium">{dict.infra.serviceCi}</p>
                </div>

                {/* Docker & Portainer */}
                <div className="relative">
                   <div className="absolute -left-[41px] top-0 p-1.5 bg-blue-500 rounded-full border-2 border-slate-800 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7.6L13 2l-9 5.6v10.8l9 5.6 9-5.6z"/></svg>
                   </div>
                   <p className="text-xs font-bold text-slate-500 uppercase">{dict.infra.host}</p>
                   <p className="text-sm font-medium">{dict.infra.serviceHost}</p>
                </div>

                {/* NPM / Cloudflare */}
                <div className="relative">
                   <div className="absolute -left-[41px] top-0 p-1.5 bg-emerald-500 rounded-full border-2 border-slate-800 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
                   </div>
                   <p className="text-xs font-bold text-slate-500 uppercase">{dict.infra.edge}</p>
                   <p className="text-sm font-medium">{dict.infra.serviceEdge}</p>
                </div>

              </div>
            </div>

            {/* Metadados Técnicos */}
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{dict.infra.stack}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-sm text-slate-500">{dict.infra.version}</span>
                    <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{commitHash}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-sm text-slate-500">{dict.infra.deployedAt}</span>
                    <span className="text-sm font-medium">{buildDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-slate-500">{dict.infra.environment}</span>
                    <span className="text-sm font-medium text-emerald-400">Node.js {process.version} (Linux)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  &quot;{dict.infra.description}&quot;
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}