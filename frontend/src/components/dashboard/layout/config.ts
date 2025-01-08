import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Transações', href: paths.dashboard.customers, icon: 'users' },
  { key: 'settings', title: 'Configurações', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Conta', href: paths.dashboard.account, icon: 'user' },
  { key: 'importofx', title: 'Importar Extrato', href: paths.dashboard.upload_file, icon: 'cloud-arrow-up' },
] satisfies NavItemConfig[];
