import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

const siteDescription =
  "The personal website of Aryan Golbaghi, a Software & AI Engineer writing about software engineering, AI, research, and reliable machine learning systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aryangolbaghi.com"),
  title: {
    default: "Aryan Golbaghi",
    template: "%s | Aryan Golbaghi",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aryan Golbaghi",
    title: "Aryan Golbaghi",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Aryan Golbaghi — Software & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Aryan Golbaghi",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        alt: "Aryan Golbaghi — Software & AI Engineer",
      },
    ],
  },
};

const themeScript = `
  try {
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
