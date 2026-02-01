"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CollapsibleSidebar } from "@/components/desktop";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MButton } from "@/components/material/m-button";
import { MBadge } from "@/components/material/m-badge";
import { AccountMenu } from "@/components/desktop/account-menu";
import {
  Bell,
  Menu,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { motion } from "framer-motion";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  description?: string;
}

interface AppShellProps {
  navigation: NavItem[];
  userName?: string;
  userEmail?: string;
  userRole?: string;
  onLogout: () => void;
  logo?: React.ReactNode;
  children: React.ReactNode;
  notificationCount?: number;
}

export function AppShell({
  navigation,
  userName,
  userEmail,
  userRole,
  onLogout,
  logo,
  children,
  notificationCount = 0,
}: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout with Sticky Sidebar */}
      <div className="hidden lg:flex">
        <div className="flex w-full">
          {/* Sticky Sidebar */}
          <div className="flex-shrink-0">
            <CollapsibleSidebar
              navigation={navigation}
              userName={userName}
              userEmail={userEmail}
              userRole={userRole}
              onLogout={onLogout}
              logo={logo}
              defaultExpanded={true}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Desktop Header */}
            <header className="sticky top-0 z-20 h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md flex shadow-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {navigation.find((item) => isActive(item.href))?.name ||
                    "Dashboard"}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <MButton
                  variant="text"
                  size="icon"
                  className="relative"
                  aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ""}`}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <MBadge
                      variant="error"
                      size="sm"
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                    >
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </MBadge>
                  )}
                </MButton>
                <ThemeToggle />
              </div>
            </header>

            {/* Page Content */}
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <MButton
              variant="text"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </MButton>
            {logo || (
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm ring-1 ring-primary/10">
                  <span className="text-sm font-bold">MR</span>
                </div>
                <span className="text-sm font-semibold text-foreground">Meeting Room</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <MButton
              variant="text"
              size="icon"
              className="relative"
              aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ""}`}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <MBadge
                  variant="error"
                  size="sm"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </MBadge>
              )}
            </MButton>
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/50 bg-background/80 backdrop-blur-md">
          <div className="flex justify-around">
            {navigation.slice(0, 5).map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-1 flex-col items-center gap-1 px-3 py-2 transition-colors"
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs",
                      active
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer */}
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card"
        >
          <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
            {logo || (
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm ring-1 ring-primary/10">
                  <span className="text-sm font-bold">MR</span>
                </div>
                <span className="text-sm font-semibold text-foreground">Meeting Room</span>
              </Link>
            )}
            <MButton
              variant="text"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <Menu className="h-5 w-5" />
            </MButton>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium">{item.name}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <Badge
                      variant={active ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/50 p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                      {userName ? getInitials(userName) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start gap-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {userName || "User"}
                    </span>
                    {userEmail && (
                      <span className="text-xs text-muted-foreground/80 line-clamp-1">
                        {userEmail}
                      </span>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <AccountMenu
                userName={userName}
                userEmail={userEmail}
                userRole={userRole}
                onLogout={onLogout}
              />
            </DropdownMenu>
          </div>
        </motion.aside>

        {/* Page Content */}
        <main className="pb-16">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
