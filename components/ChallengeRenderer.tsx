'use client';

import dynamic from 'next/dynamic';

const Starfield = dynamic(() => import('./challenges/001-Starfield'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl animate-pulse text-center p-6">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
      <p className="text-slate-400 font-mono text-sm">Inicializando Simulação de Alto Desempenho...</p>
      <p className="text-slate-500 text-xs mt-2 italic">HTML5 Canvas + Vanilla TS</p>
    </div>
  )
});

const challengeComponents: Record<number, React.ComponentType> = {
  1: Starfield
};

export default function ChallengeRenderer({ id }: { id: number }) {
  const Component = challengeComponents[id];
  
  if (!Component) {
    return (
      <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700">
        <p>A simulação #{id} ainda não foi vinculada ao renderizador.</p>
      </div>
    );
  }

  return <Component />;
}