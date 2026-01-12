"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MainLayout, MainLayoutHeader, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, AppLogo } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, Users, Building, Gift, Mail, CreditCard, BarChart } from 'lucide-react';

const navItems: NavItem[] = [
    { href: '/admin/dashboard', title: 'Panou', icon: LayoutDashboard },
    { href: '/admin/users', title: 'Utilizatori', icon: Users },
    { href: '/admin/partners', title: 'Parteneri', icon: Building },
    { href: '/admin/offers', title: 'Oferte', icon: Gift },
    { href: '/admin/invites', title: 'Invitații', icon: Mail },
    { href: '/admin/payments', title: 'Plăți', icon: CreditCard },
    { href: '/admin/reports', title: 'Rapoarte', icon: BarChart },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const userRole = "Admin"

    return (
        <MainLayout>
            <Sidebar>
                <SidebarHeader>
                    <AppLogo />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    tooltip={item.title}
                                >
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <div className="text-xs text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
                        <p>Autentificat ca {userRole}</p>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <MainLayoutHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </SidebarInset>
        </MainLayout>
    );
}
