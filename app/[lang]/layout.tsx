import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Cyber Senpai Works | Desenvolvimento e DevOps",
  description: "Estúdio de desenvolvimento Full Stack focado em soluções web, mobile e infraestrutura em nuvem por Gabriel Vancini.",
  keywords: ["Desenvolvedor Web", "Full Stack", "Next.js", "PHP", "DevOps", "Freelancer", "Santo André"],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;

  return (
    <html lang={resolvedParams.lang}>
      <body>{children}</body>
    </html>
  );
}