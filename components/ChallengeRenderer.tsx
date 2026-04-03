'use client';

import { useState } from 'react';

import type { ImplementedChallenge } from '../data/implementedChallenges';
import type { Dictionary } from '../dictionary';
import { challengeComponents } from './challenges/registry';

export default function ChallengeRenderer({
  challenge,
  dict,
}: {
  challenge: ImplementedChallenge;
  dict: Dictionary;
}) {
  const [activeTab, setActiveTab] = useState<'solution' | 'reference'>('solution');
  const Component = challengeComponents[challenge.id];
  
  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('solution')}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'solution' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}
        >
          {dict.challenges.tabSolution}
          {activeTab === 'solution' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('reference')}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'reference' ? 'text-amber-400' : 'text-slate-500 hover:text-white'}`}
        >
          {dict.challenges.tabReference}
          {activeTab === 'reference' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'solution' ? (
          Component ? <Component /> : (
            <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700">
              <p>The simulation for {challenge.title} is not linked to the renderer yet.</p>
            </div>
          )
        ) : (
          <div className="bg-slate-800/30 rounded-2xl p-12 border border-slate-700 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 24.47 24.47 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 24.47 24.47 0 0 1-15 0 2 2 0 0 1-2-2z"/><path d="m10 15 5-3-5-3z"/></svg>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">The Coding Train</h4>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                {dict.challenges.originalReferenceDesc}
              </p>
              <a 
                href={challenge.videoUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 px-8 rounded-full transition-all"
              >
                {dict.challenges.viewVideo}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
