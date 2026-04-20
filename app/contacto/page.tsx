"use client";
import { Mail, MessageCircle, Clock } from "lucide-react";
import ContactFormWrapper from "@/components/ContactFormWrapper";
import { useLang } from "@/lib/i18n";

export default function ContactoPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-[#EDE4D8] pt-24 pb-12 px-4 text-center">
        <p className="text-[9px] font-bold tracking-[.28em] uppercase text-[#8D6E63] mb-2">{t("cont_eyebrow")}</p>
        <h1 className="font-serif text-[clamp(34px,5vw,56px)] text-[#4A3228]">{t("cont_h1")}</h1>
        <div className="w-8 h-px bg-[#8D6E63] mx-auto mt-4" />
      </section>

      <section className="py-14 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-3">
            <ContactFormWrapper />
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-serif text-[clamp(18px,2.5vw,24px)] text-[#4A3228]">También aquí</h3>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, lbl: t("info_email"), val: "hola@maderasdelsur.com" },
                { icon: MessageCircle, lbl: t("info_wa"), val: "+34 600 000 000" },
                { icon: Clock, lbl: t("info_hours"), val: "Lun–Vie · 9:00–18:00 CET" },
              ].map(({ icon: Icon, lbl, val }) => (
                <div key={lbl} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#8D6E63]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#4A3228]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[.12em] uppercase text-[#8D6E63] mb-0.5">{lbl}</p>
                    <p className="text-[13px] text-[#4A3228]">{val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#EDE4D8] border-l-[3px] border-[#8D6E63]/35 px-4 py-3 rounded-r-sm mt-4">
              <h4 className="font-serif text-[16px] text-[#4A3228] mb-1">{t("trust_h")}</h4>
              <p className="text-[11.5px] text-[#4A3228]/62 leading-relaxed font-light">{t("trust_p")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
