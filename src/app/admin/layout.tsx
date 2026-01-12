
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MainLayout, MainLayoutHeader, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, AppLogo } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, Users, Building, Gift, Mail, CreditCard, BarChart } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User } from "@/types";
import { doc } from 'firebase/firestore';

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
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => user ? doc(firestore, `users/${user.uid}`) : null, [user, firestore]);
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/');
        } else if (userProfile && userProfile.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [user, userProfile, isUserLoading, router]);

    if (isUserLoading || isProfileLoading || !userProfile) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p>Se încarcă...</p>
            </div>
        );
    }

    const userRole = userProfile.role;

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
