"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS_LIST: Lang[] = ["es", "ca", "en"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  const linkCls = cn(
    "text-sm font-medium transition-colors px-3 py-1.5 rounded-sm",
    transparent
      ? "text-white/75 hover:text-white hover:bg-white/10"
      : "text-[#4A3228] hover:bg-[#4A3228]/06"
  );

  const langBtnCls = (l: Lang) => cn(
    "text-[10.5px] font-semibold px-2 py-1 rounded-sm transition-all border-none bg-none cursor-pointer",
    transparent
      ? l === lang ? "text-white bg-white/15" : "text-white/45 hover:text-white"
      : l === lang ? "text-[#4A3228] bg-[#4A3228]/08" : "text-[#B89B93] hover:text-[#4A3228]"
  );

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 h-[60px] transition-all duration-300",
        !transparent && "bg-[#F7F2EC]/97 backdrop-blur-md border-b border-[#8D6E63]/14 shadow-sm"
      )}>
        <nav className="w-full px-7 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none gap-px">
            <span className={cn("font-serif text-[19px] font-medium transition-colors",
              transparent ? "text-white" : "text-[#4A3228]")}>
              Maderas del Sur
            </span>
            <span className={cn("text-[8px] tracking-[.22em] uppercase transition-colors",
              transparent ? "text-white/42" : "text-[#8D6E63]")}>
              Artesanía · Grabado Láser
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/historia" className={linkCls}>{t("nav_historia")}</Link>
            <Link href="/contacto" className={linkCls}>{t("nav_contacto")}</Link>
            <Link href="/#configurador" className={cn(
              "ml-1 px-5 py-2 rounded-sm text-sm font-semibold transition-all",
              transparent
                ? "bg-white/14 text-white border border-white/28 hover:bg-white/24"
                : "bg-[#4A3228] text-white hover:bg-[#3a2820]"
            )}>
              {t("nav_cta")}
            </Link>
            {/* Lang switcher */}
            <div className={cn("flex items-center gap-0.5 ml-3 pl-3",
              transparent ? "border-l border-white/22" : "border-l border-[#8D6E63]/25")}>
              {LANGS_LIST.map((l) => (
                <button key={l} onClick={() => setLang(l)} className={langBtnCls(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(v => !v)} aria-label="Menú"
            className={cn("md:hidden p-2 transition-colors",
              transparent ? "text-white" : "text-[#4A3228]")}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-[#F7F2EC] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
        open ? "opacity-100 pointer-events-auto" : "hidden"
      )}>
        {[
          { href: "/#configurador", key: "nav_cta" as const, cta: true },
          { href: "/historia", key: "nav_historia" as const },
          { href: "/contacto", key: "nav_contacto" as const },
        ].map(({ href, key, cta }, i) =>
          cta ? (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="bg-[#4A3228] text-white font-serif text-3xl px-10 py-4 rounded-sm">
              {t(key)}
            </Link>
          ) : (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="font-serif text-3xl text-[#4A3228]">
              {t(key)}
            </Link>
          )
        )}
        <div className="flex gap-3 mt-2">
          {LANGS_LIST.map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className={cn("text-sm font-semibold px-4 py-2 border rounded-sm cursor-pointer transition-all",
                l === lang
                  ? "border-[#4A3228] text-[#4A3228] bg-[#4A3228]/06"
                  : "border-[#8D6E63]/35 text-[#8D6E63]")}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
