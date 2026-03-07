import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Cyber Senpai Works | Desenvolvimento e DevOps",
  description: "Estúdio de desenvolvimento Full Stack focado em soluções web, mobile e infraestrutura em nuvem por Gabriel Vancini.",
  keywords: ["Desenvolvedor Web", "Full Stack", "Next.js", "PHP", "DevOps", "Freelancer", "Santo André"],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}