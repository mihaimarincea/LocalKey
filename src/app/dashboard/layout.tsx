import { MainLayout } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, QrCode, Mail } from 'lucide-react';

const navItems: NavItem[] = [
    { href: '/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/qr', title: 'Get QR Code', icon: QrCode },
    { href: '/dashboard/invites', title: 'Invites', icon: Mail },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout navItems={navItems} userRole="User">{children}</MainLayout>;
}
