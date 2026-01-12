import { MainLayout } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, Users, Building, Gift, Mail, CreditCard, BarChart, ShieldAlert } from 'lucide-react';

const navItems: NavItem[] = [
    { href: '/admin/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', title: 'Users', icon: Users },
    { href: '/admin/partners', title: 'Partners', icon: Building },
    { href: '/admin/offers', title: 'Offers', icon: Gift },
    { href: '/admin/invites', title: 'Invites', icon: Mail },
    { href: '/admin/payments', title: 'Payments', icon: CreditCard },
    { href: '/admin/reports', title: 'Reports', icon: BarChart },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout navItems={navItems} userRole="Admin">{children}</MainLayout>;
}
