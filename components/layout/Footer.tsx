export default function Footer({ dict }: { dict: Record<string, Record<string, string>> }) {
  const currentYear = new Date().getFullYear();
  
  return (
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
  );
}