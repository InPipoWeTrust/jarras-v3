"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { getSteps, calcTotal, priceLabel, buildSummary, INITIAL_STATE, ConfigState } from "@/lib/configurator-data";
import FileUpload from "@/components/FileUpload";

export default function JarraConfigurator() {
  const router = useRouter();
  const { lang, t } = useLang();
  const [config, setConfig] = useState<ConfigState>(INITIAL_STATE);
  const [openStep, setOpenStep] = useState<string>("modelo");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imgKey, setImgKey] = useState(0);

  const steps = getSteps(lang);
  const total = calcTotal(config, steps);

  // Priority image: grabado > madera > modelo
  const mainImage = (() => {
    for (const sid of ["grabado", "madera", "modelo"] as const) {
      const step = steps.find((s) => s.id === sid);
      const opt = step?.options.find((o) => o.id === config[sid]);
      if (opt?.image) return opt.image;
    }
    return steps[0].options[0].image;
  })();

  const selectOption = useCallback((stepId: keyof ConfigState, optionId: string) => {
    setConfig((prev) => ({ ...prev, [stepId]: optionId }));
    setImgKey((k) => k + 1);
  }, []);

  const toggleStep = (stepId: string) => {
    setOpenStep((prev) => (prev === stepId ? "" : stepId));
    setImgKey((k) => k + 1);
  };

  const handleCTA = () => {
    const msg = buildSummary(config, steps, uploadedFiles, {
      intro: t("summary_intro"),
      price: t("summary_price"),
      filesLabel: t("summary_files"),
      question: t("summary_q"),
    });
    router.push(`/contacto?msg=${encodeURIComponent(msg)}`);
  };

  const isCustomGrabado = config.grabado === "personalizado";

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
      {/* ── LEFT: sticky image (desktop only) ── */}
      <div className="hidden lg:block lg:w-[44%] lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#E2D3C3] shadow-lg">
          <Image
            key={imgKey}
            src={mainImage}
            alt="Vista previa de tu jarra"
            fill className="object-cover transition-all duration-400"
            sizes="44vw" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/35 via-transparent to-transparent pointer-events-none" />
          {/* Live badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#F7F2EC]/92 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#8D6E63]/14">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5C6350] animate-pulse flex-shrink-0" />
            <span className="text-[9.5px] font-semibold tracking-[.1em] uppercase text-[#4A3228]">
              {t("conf_live")}
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: steps ── */}
      <div className="lg:w-[56%] flex flex-col gap-1.5">
        {steps.map((step) => {
          const stepId = step.id as keyof ConfigState;
          const isOpen = openStep === step.id;
          const selectedOpt = step.options.find((o) => o.id === config[stepId]);

          return (
            <div key={step.id}
              className={cn("bg-white rounded-sm border overflow-hidden transition-all duration-200",
                isOpen ? "border-[#8D6E63]/22 shadow-sm" : "border-[#8D6E63]/10")}>
              {/* Header */}
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F7F2EC]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn("w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                    config[stepId] ? "bg-[#5C6350]" : "border border-[#8D6E63]/40")}>
                    {config[stepId] && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <div>
                    <p className="font-serif text-[#4A3228] text-[15px]">{step.title}</p>
                    {!isOpen && selectedOpt && (
                      <p className="text-[11px] text-[#8D6E63] mt-0.5">
                        {selectedOpt.name} · {priceLabel(selectedOpt, stepId, t("included"))}
                      </p>
                    )}
                  </div>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-[#B89B93]" /> : <ChevronDown size={14} className="text-[#B89B93]" />}
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1">
                  <p className="text-[11.5px] text-[#8D6E63]/70 mb-3 leading-relaxed">{step.subtitle}</p>

                  {/* Mobile inline image */}
                  {selectedOpt && (
                    <div className="lg:hidden relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-3 bg-[#E2D3C3]">
                      <Image
                        key={selectedOpt.id + imgKey}
                        src={selectedOpt.image}
                        alt={selectedOpt.name}
                        fill className="object-cover transition-all duration-300"
                        sizes="100vw"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    {step.options.map((opt) => {
                      const isSel = config[stepId] === opt.id;
                      return (
                        <button key={opt.id}
                          onClick={() => selectOption(stepId, opt.id)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-all duration-150",
                            isSel ? "border-[#4A3228] bg-[#4A3228]/04"
                              : "border-[#8D6E63]/14 hover:border-[#8D6E63]/45 hover:bg-[#F7F2EC]/50 hover:translate-x-0.5"
                          )}>
                          <div className="w-11 h-11 rounded-sm overflow-hidden flex-shrink-0 bg-[#E2D3C3]">
                            <img src={opt.image} alt={opt.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={cn("text-[13px] font-medium", isSel ? "text-[#4A3228]" : "text-[#1C1410]")}>
                                {opt.name}
                              </span>
                              {opt.badge && (
                                <span className="text-[8px] font-bold tracking-[.07em] uppercase bg-[#5C6350]/11 text-[#5C6350] px-2 py-0.5 rounded-full">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#8D6E63]/72 mt-0.5 leading-snug">{opt.description}</p>
                          </div>
                          <span className={cn("text-[13px] font-medium flex-shrink-0", isSel ? "text-[#4A3228]" : "text-[#B89B93]")}>
                            {priceLabel(opt, stepId, t("included"))}
                          </span>
                          <div className={cn("w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all",
                            isSel ? "bg-[#4A3228] border-[#4A3228]" : "border-[#8D6E63]/35")}>
                            {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* File upload for custom engraving */}
                  {step.id === "grabado" && isCustomGrabado && (
                    <div className="mt-4 pt-4 border-t border-[#8D6E63]/10">
                      <p className="text-[10px] font-bold tracking-[.14em] uppercase text-[#4A3228] mb-2">
                        {t("upload_lbl")}
                      </p>
                      <FileUpload files={uploadedFiles} onChange={setUploadedFiles} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* CTA */}
        <div className="bg-[#4A3228] rounded-sm p-6 text-center mt-1">
          <p className="text-[9px] font-bold tracking-[.22em] uppercase text-white/38 mb-1">{t("cta_ey")}</p>
          <p className="font-serif text-[34px] text-white font-light mb-0.5">{total} €</p>
          <p className="text-[10px] text-white/38 mb-5">{t("cta_note")}</p>
          <button onClick={handleCTA}
            className="w-full bg-[#F7F2EC] text-[#4A3228] font-semibold text-[13.5px] py-4 rounded-sm hover:bg-white active:scale-[.99] transition-all">
            {t("cta_btn")}
          </button>
          <p className="text-[10px] text-white/28 mt-2">{t("cta_resp")}</p>
        </div>
      </div>
    </div>
  );
}
