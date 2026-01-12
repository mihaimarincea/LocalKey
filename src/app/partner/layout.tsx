import { MainLayout } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, List, ScanLine } from 'lucide-react';

const navItems: NavItem[] = [
    { href: '/partner/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/partner/scan', title: 'Scan QR Code', icon: ScanLine },
    { href: '/partner/offers', title: 'Manage Offers', icon: List },
];

export default function PartnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout navItems={navItems} userRole="Partner">{children}</MainLayout>;
}
