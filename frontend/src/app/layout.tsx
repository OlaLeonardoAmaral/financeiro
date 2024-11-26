import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { AuthProvider } from '@/contexts/AuthContext';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { CategoriaProvider } from '@/contexts/CategoriaContext';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="pt-br">
      <body>
        <LocalizationProvider>
          <AuthProvider>
            <ThemeProvider>
              <CategoriaProvider>
                {children}
              </CategoriaProvider>
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
