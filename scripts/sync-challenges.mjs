import fs from 'fs';

async function sync() {
  console.log('--- Iniciando Sincronização de Dados (DevOps Approach) ---');
  
  // Fonte original: Repositório do Coding Train no GitHub
  const GITHUB_API = 'https://api.github.com/repos/CodingTrain/thecodingtrain.com/contents/content/videos/challenges';

  try {
    const response = await fetch(GITHUB_API, {
      headers: { 'User-Agent': 'CyberSenpai-Web-Sync' }
    });
    
    if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);
    
    const items = await response.json();
    
    const processed = items
      .filter(item => item.type === 'dir' && /^\d+/.test(item.name))
      .map(item => {
        const parts = item.name.split('-');
        const id = parseInt(parts[0], 10);
        const titleRaw = parts.slice(1).join(' ');
        const title = titleRaw.charAt(0).toUpperCase() + titleRaw.slice(1);
        
        return {
          id,
          title: title || 'Challenge',
          slug: item.name,
          implemented: id === 1, // Starfield como PoC
          videoUrl: `https://www.youtube.com/results?search_query=Coding+Train+Challenge+${id}`
        };
      })
      .sort((a, b) => a.id - b.id);

    const tsContent = `export interface Challenge {
  id: number;
  title: string;
  slug: string;
  implemented: boolean;
  videoUrl?: string;
}

export const challenges: Challenge[] = ${JSON.stringify(processed, null, 2)};
`;

    fs.writeFileSync('./data/challenges.ts', tsContent);
    console.log(`Sincronizados ${processed.length} desafios com sucesso!`);
    
  } catch (err) {
    console.error('Falha na sincronização:', err.message);
  }
}

sync();
