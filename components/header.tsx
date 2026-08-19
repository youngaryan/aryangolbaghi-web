import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/writing", label: "Writing" },
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        Aryan Golbaghi
      </Link>
      <div className="header-actions">
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
