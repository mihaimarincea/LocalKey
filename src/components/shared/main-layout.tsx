"use client"
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/shared/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarProvider>
  )
}

export function MainLayoutHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      <UserNav />
    </header>
  );
}

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
export { default as AppLogo } from "@/components/shared/app-logo";