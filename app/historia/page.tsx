"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function HistoriaPage() {
  const { t } = useLang();
  return (
    <>
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image src="https://picsum.photos/seed/taller-historia-rustico-artesano/1600/900" alt="Taller" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1C1410]/62" />
        <div className="relative z-10 text-center px-5">
          <p className="text-[9px] font-bold tracking-[.28em] uppercase text-white/38 mb-3">{t("hist_eyebrow")}</p>
          <h1 className="font-serif text-[clamp(36px,6vw,64px)] text-white">
            {t("hist_h1_a")}<br /><em className="italic text-[#E2D3C3]">{t("hist_h1_b")}</em>
          </h1>
        </div>
      </section>

      <article className="max-w-[660px] mx-auto px-5 py-16 space-y-10">
        <div>
          <h2 className="font-serif text-[clamp(24px,3.5vw,36px)] text-[#4A3228] mb-2">{t("hist_h2_1")}</h2>
          <div className="w-8 h-px bg-[#8D6E63] mb-4" />
          <p className="text-[14.5px] text-[#4A3228]/75 leading-[1.82] font-light">{t("hist_p_1")}</p>
        </div>
        <div className="relative aspect-video rounded-sm overflow-hidden">
          <Image src="https://picsum.photos/seed/madera-taller-herramientas-familia/1200/675" alt="Taller" fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-[clamp(24px,3.5vw,36px)] text-[#4A3228] mb-2">{t("hist_h2_2")}</h2>
          <div className="w-8 h-px bg-[#8D6E63] mb-4" />
          <p className="text-[14.5px] text-[#4A3228]/75 leading-[1.82] font-light">{t("hist_p_2")}</p>
        </div>
        <blockquote className="border-l-[3px] border-[#8D6E63]/40 pl-5 py-2">
          <p className="font-serif text-[20px] italic text-[#4A3228] leading-snug">"{t("hist_quote")}"</p>
        </blockquote>
        <div>
          <h2 className="font-serif text-[clamp(24px,3.5vw,36px)] text-[#4A3228] mb-2">{t("hist_h2_3")}</h2>
          <div className="w-8 h-px bg-[#8D6E63] mb-4" />
          <p className="text-[14.5px] text-[#4A3228]/75 leading-[1.82] font-light">{t("hist_p_3")}</p>
        </div>
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image src="https://picsum.photos/seed/jarra-madera-finalizada-artesanal/1000/750" alt="Jarra" fill className="object-cover" />
        </div>
        <div className="text-center pt-2">
          <Link href="/#configurador"
            className="inline-flex items-center gap-2 bg-[#4A3228] text-white font-semibold text-[13.5px] px-7 py-3.5 rounded-sm hover:bg-[#3a2820] transition-all">
            {t("hist_cta")}
          </Link>
        </div>
      </article>
    </>
  );
}
