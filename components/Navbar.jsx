
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  FileText,
  Image,
  Info,
  Mail,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/posts-table", label: "Posts Table", icon: FileText },
  { href: "/post", label: "Post", icon: FileText },
  { href: "/imagepost", label: "Image Posts", icon: Image },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  // The dashboard has its own sidebar.
  //if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="mx-auto flex min-h-[72px] max-w-[1600px] flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="mr-auto flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173D35] text-white">
            <Landmark size={21} />
          </span>

          <span>
            <span className="block text-lg font-bold tracking-tight text-gray-950 dark:text-white">
              KriBank
            </span>
            <span className="block text-[11px] text-gray-500">
              Digital banking demo
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="order-3 flex w-full items-center gap-1 overflow-x-auto pb-1 sm:order-none sm:w-auto sm:flex-1 sm:justify-center">
          {links.slice(1).map(({ href, label, icon: Icon }) => {
            const active = pathname === href ||
              (href === "/posts-table" && pathname.startsWith("/post-details/"));

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#173D35] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Theme */}
        <div className="flex shrink-0 items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
