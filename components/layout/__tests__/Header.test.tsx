import type { ReactNode } from 'react';

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { dictionaries } from '../../../dictionary';
import Header from '../Header';

const mockUsePathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header mobile navigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/pt/challenges/1-starfield');
  });

  afterEach(() => {
    cleanup();
  });

  it('opens the mobile menu with navigation and language links', () => {
    render(<Header lang="pt" dict={dictionaries.pt} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    const dialog = screen.getByRole('dialog', { name: 'Menu' });

    expect(within(dialog).getByRole('link', { name: 'Projetos' }).getAttribute('href')).toBe('/pt#projects');
    expect(within(dialog).getByRole('link', { name: 'Serviços' }).getAttribute('href')).toBe('/pt#services');
    expect(within(dialog).getByRole('link', { name: 'Sobre' }).getAttribute('href')).toBe('/pt#about');
    expect(within(dialog).getByRole('link', { name: 'Laboratório' }).getAttribute('href')).toBe('/pt/challenges');
    expect(within(dialog).getByRole('link', { name: 'Contato' }).getAttribute('href')).toBe('/pt#contact');
    expect(within(dialog).getByRole('link', { name: 'PT' }).getAttribute('href')).toBe('/pt/challenges/1-starfield');
    expect(within(dialog).getByRole('link', { name: 'EN' }).getAttribute('href')).toBe('/en/challenges/1-starfield');
  });

  it('closes the mobile menu when a navigation link is selected', () => {
    render(<Header lang="pt" dict={dictionaries.pt} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    fireEvent.click(within(screen.getByRole('dialog', { name: 'Menu' })).getByRole('link', { name: 'Laboratório' }));

    expect(screen.queryByRole('dialog', { name: 'Menu' })).toBeNull();
  });

  it('closes the mobile menu when escape is pressed', () => {
    render(<Header lang="pt" dict={dictionaries.pt} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Menu' })).toBeNull();
  });
});
