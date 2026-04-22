"use client";
import Link from "next/link";
import JarraConfigurator from "@/components/JarraConfigurator";
import JarraAssembly from "@/components/JarraAssembly";
import { useLang } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useLang();
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=80&auto=format&fit=crop">
          {/* <source src="/video.webm" type="video/webm" /> */}
          {/* <source src="/video.mp4" type="video/mp4" /> */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1410]/68 via-[#1C1410]/42 to-[#4A3228]/60" />
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto" style={{animation:"fadeUp .8s .15s ease-out both"}}>
          <h1 className="font-serif text-[clamp(44px,7vw,80px)] text-white leading-[1.06] mb-4">
            {t("hero_h1").split("\n")[0]}<br />
            <em className="italic text-[#E2D3C3]">{t("hero_h1").split("\n")[1]}</em>
          </h1>
          <p className="text-[15px] text-white/68 leading-[1.72] max-w-md mx-auto mb-8 font-light">{t("hero_sub")}</p>
          <a href="#configurador"
            className="inline-flex items-center gap-2.5 bg-white text-[#4A3228] font-semibold text-[13.5px] px-8 py-4 rounded-sm hover:bg-[#EDE4D8] transition-all hover:-translate-y-0.5 shadow-lg">
            {t("hero_btn")}
          </a>
        </div>
      </section>

      {/* ENSAMBLAJE 3D */}
      <JarraAssembly />

      {/* CONFIGURADOR */}
      <section id="configurador" className="bg-[#F7F2EC] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[.28em] uppercase text-[#8D6E63] mb-2">{t("conf_eyebrow")}</p>
            <h2 className="font-serif text-[clamp(32px,5vw,52px)] text-[#4A3228] mb-2">{t("conf_title")}</h2>
            <div className="w-9 h-px bg-[#8D6E63] mx-auto mb-3" />
            <p className="text-[14px] text-[#8D6E63] max-w-md mx-auto leading-relaxed font-light">{t("conf_sub")}</p>
          </div>
          <JarraConfigurator />
        </div>
      </section>

      {/* CTA BAR */}
      <section className="bg-[#5C4033] py-16 px-4 text-center">
        <p className="text-[10px] font-bold tracking-[.28em] uppercase text-white/35 mb-2">{t("ctabar_ey")}</p>
        <h2 className="font-serif text-[clamp(24px,4vw,40px)] text-white mb-3">{t("ctabar_h2")}</h2>
        <p className="text-[13.5px] text-white/58 max-w-sm mx-auto mb-7 leading-relaxed font-light">{t("ctabar_p")}</p>
        <Link href="/contacto"
          className="inline-flex items-center gap-2 bg-[#F7F2EC] text-[#4A3228] font-semibold text-[13px] px-7 py-3.5 rounded-sm hover:bg-white transition-all hover:-translate-y-0.5">
          {t("ctabar_btn")}
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#291810] py-10 px-6 text-center">
        <p className="font-serif text-[17px] text-white/60 mb-1">Maderas del Sur</p>
        <p className="text-[8px] tracking-[.2em] uppercase text-white/24">Artesanía · Grabado Láser · España</p>
        <div className="flex justify-center gap-5 mt-5">
          {[{href:"/historia",key:"nav_historia"},{href:"/contacto",key:"nav_contacto"}].map(({href,key})=>(
            <Link key={href} href={href} className="text-[11.5px] text-white/38 hover:text-white/70 transition-colors">
              {t(key as any)}
            </Link>
          ))}
        </div>
        <p className="text-[9.5px] text-white/18 mt-5">© 2025 Maderas del Sur · Hecho con cuidado en España 🌿</p>
      </footer>

      <style jsx global>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
}
