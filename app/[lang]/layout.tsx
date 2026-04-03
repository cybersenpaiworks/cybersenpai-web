import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale } from "../../i18n";
import { getSiteMetadata } from "../../siteMetadata";
import "../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;

  return getSiteMetadata(isLocale(lang) ? lang : defaultLocale);
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
