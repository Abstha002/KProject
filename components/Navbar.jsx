
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center gap-4 border-b border-gray-200 p-4 dark:border-gray-700">
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/post">Post</Link>
      <Link href="/imagepost">ImagePost</Link>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
