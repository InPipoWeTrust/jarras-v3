"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { useLang } from "@/lib/i18n";

function Inner() {
  const params = useSearchParams();
  const { t } = useLang();
  const prefill = params.get("msg") ? decodeURIComponent(params.get("msg")!) : "";
  return (
    <>
      {prefill && (
        <div className="mb-5 bg-[#EDE4D8] border-l-3 border-[#4A3228] px-4 py-3 rounded-r-sm">
          <p className="text-[9px] font-bold tracking-[.14em] uppercase text-[#8D6E63] mb-1">{t("pf_lbl")}</p>
          <p className="text-[12px] text-[#4A3228]/68 leading-relaxed">{t("pf_txt")}</p>
        </div>
      )}
      <ContactForm prefillMessage={prefill} />
    </>
  );
}

export default function ContactFormWrapper() {
  return <Suspense fallback={<ContactForm />}><Inner /></Suspense>;
}
