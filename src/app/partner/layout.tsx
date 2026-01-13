
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MainLayout, MainLayoutHeader, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, AppLogo } from '@/components/shared/main-layout';
import type { NavItem } from '@/types';
import { LayoutDashboard, List, ScanLine } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User, Partner } from "@/types";
import { doc } from 'firebase/firestore';
import { useLanguage } from "@/contexts/language-context";

export default function PartnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();
    const { t } = useLanguage();

    const navItems: NavItem[] = [
        { href: '/partner/dashboard', title: t('partnerLayout.nav.dashboard'), icon: LayoutDashboard },
        { href: '/partner/scan', title: t('partnerLayout.nav.scanQrCode'), icon: ScanLine },
        { href: '/partner/offers', title: t('partnerLayout.nav.manageOffers'), icon: List },
    ];

    const userDocRef = useMemoFirebase(() => user ? doc(firestore, `users/${user.uid}`) : null, [user, firestore]);
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

    const partnerDocRef = useMemoFirebase(() => user ? doc(firestore, `partners/${user.uid}`) : null, [user, firestore]);
    const { data: partnerProfile, isLoading: isPartnerProfileLoading } = useDoc<Partner>(partnerDocRef);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login-partener');
            return;
        } 
        
        if (userProfile && userProfile.role !== 'partner') {
            router.push('/dashboard');
            return;
        }

        if (partnerProfile && partnerProfile.status !== 'approved') {
            router.push('/login-partener');
            return;
        }

    }, [user, userProfile, partnerProfile, isUserLoading, router]);

    const isLoading = isUserLoading || isProfileLoading || isPartnerProfileLoading || !userProfile || !partnerProfile;

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p>{t('loading')}...</p>
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
                        <p>{t('partnerLayout.loggedInAs', { role: userRole })}</p>
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
