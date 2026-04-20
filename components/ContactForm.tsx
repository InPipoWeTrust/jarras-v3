"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, Upload, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

const MAX_FILE_MB = 20;

export default function ContactForm({ prefillMessage = "" }: { prefillMessage?: string }) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waChecked, setWaChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = z.object({
    nombre:   z.string().min(2),
    email:    z.string().email(),
    pais:     z.string().min(2),
    telefono: z.string().optional(),
    mensaje:  z.string().min(10).max(2000),
  });
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { mensaje: prefillMessage },
  });

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const errs: string[] = [];
    const toAdd: File[] = [];
    Array.from(incoming).forEach((f) => {
      if (f.size > MAX_FILE_MB * 1024 * 1024) { errs.push(`"${f.name}" supera ${MAX_FILE_MB} MB`); return; }
      if (files.find((x) => x.name === f.name && x.size === f.size)) { errs.push(`"${f.name}" ya añadido`); return; }
      toAdd.push(f);
    });
    setFileErrors(errs);
    setFiles((prev) => [...prev, ...toAdd]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log("📬 Contacto:", data, "Archivos:", files.map((f) => f.name), "WhatsApp:", waChecked);
    // Para email real → ver README (Resend)
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  const inputCls = "w-full border border-[#8D6E63]/32 rounded-sm px-3 py-2.5 text-[13px] bg-white/72 text-[#4A3228] placeholder:text-[#8D6E63]/45 focus:border-[#4A3228] focus:outline-none focus:ring-[3px] focus:ring-[#4A3228]/07 transition-all";
  const lblCls = "block text-[11px] font-semibold text-[#4A3228] mb-1.5 tracking-[.02em]";
  const errCls = "text-[10.5px] text-red-600 mt-1";

  if (sent) return (
    <div className="text-center py-14 space-y-3">
      <div className="w-14 h-14 bg-[#5C6350]/12 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle size={28} className="text-[#5C6350]" />
      </div>
      <h3 className="font-serif text-2xl text-[#4A3228]">{t("cont_suc_h")}</h3>
      <p className="text-[13px] text-[#8D6E63] max-w-xs mx-auto leading-relaxed">{t("cont_suc_p")}</p>
      <button onClick={() => setSent(false)} className="text-[11.5px] text-[#8D6E63] underline underline-offset-2 mt-2">
        {t("cont_suc_again")}
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lblCls}>{t("cont_name_lbl")} <span className="text-[#8D6E63]">*</span></label>
          <input {...register("nombre")} placeholder={t("cont_name_ph")} className={inputCls} />
          {errors.nombre && <p className={errCls}>{t("cont_err_name")}</p>}
        </div>
        <div>
          <label className={lblCls}>{t("cont_email_lbl")} <span className="text-[#8D6E63]">*</span></label>
          <input {...register("email")} type="email" placeholder={t("cont_email_ph")} className={inputCls} />
          {errors.email && <p className={errCls}>{t("cont_err_email")}</p>}
        </div>
      </div>

      {/* País */}
      <div>
        <label className={lblCls}>{t("cont_country_lbl")} <span className="text-[#8D6E63]">*</span></label>
        <input {...register("pais")} placeholder={t("cont_country_ph")} className={inputCls} />
        {errors.pais && <p className={errCls}>{t("cont_err_country")}</p>}
      </div>

      {/* WhatsApp checkbox */}
      <div>
        <div
          onClick={() => setWaChecked((v) => !v)}
          className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm cursor-pointer transition-all ${waChecked ? "border-[#5C6350] bg-[#5C6350]/06" : "border-[#8D6E63]/20 bg-white/50 hover:border-[#8D6E63]/40"}`}>
          <input type="checkbox" checked={waChecked} readOnly className="w-3.5 h-3.5 accent-[#5C6350] flex-shrink-0 pointer-events-none" />
          <span className="text-sm">💬</span>
          <span className="text-[12.5px] text-[#4A3228] flex-1">{t("cont_wa_text")}</span>
        </div>
        <p className="text-[10.5px] text-[#8D6E63] mt-1.5 pl-0.5">{t("cont_wa_note")}</p>
      </div>

      {/* Teléfono — solo si WA marcado */}
      {waChecked && (
        <div>
          <label className={lblCls}>{t("cont_tel_lbl")} <span className="text-[#8D6E63]">*</span></label>
          <input {...register("telefono")} type="tel" placeholder="+34 600 000 000" className={inputCls} />
        </div>
      )}

      {/* Mensaje */}
      <div>
        <label className={lblCls}>{t("cont_msg_lbl")} <span className="text-[#8D6E63]">*</span></label>
        <textarea {...register("mensaje")} rows={6} placeholder={t("cont_msg_ph")}
          className={`${inputCls} resize-none min-h-[110px]`} />
        {errors.mensaje && <p className={errCls}>{t("cont_err_msg")}</p>}
      </div>

      {/* File upload */}
      <div>
        <label className={lblCls}>
          {t("cont_files_lbl")} <span className="text-[#8D6E63] font-normal">({t("cont_files_hint")})</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-[#8D6E63]/28 rounded-sm px-4 py-4 text-center cursor-pointer hover:border-[#4A3228] hover:bg-[#4A3228]/03 transition-all bg-white/50">
          <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.gif,.svg,.pdf"
            className="sr-only" onChange={(e) => addFiles(e.target.files)} />
          <Upload size={18} className="text-[#8D6E63] mx-auto mb-1.5 opacity-60" />
          <p className="text-[12px] text-[#4A3228] font-medium">{t("cont_dz_txt")}</p>
          <p className="text-[10px] text-[#B89B93] mt-0.5">{t("cont_dz_hint")}</p>
        </div>
        {fileErrors.map((e, i) => (
          <p key={i} className="text-[10.5px] text-red-600 mt-1 bg-red-50 px-2 py-1 rounded-sm">{e}</p>
        ))}
        {files.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
            {files.map((f, i) => (
              <div key={i} className="relative border border-[#8D6E63]/12 rounded-sm overflow-hidden bg-white group">
                <div className="h-14 bg-[#EDE4D8] flex items-center justify-center text-lg">📎</div>
                <div className="px-1.5 py-1">
                  <p className="text-[9px] font-medium text-[#4A3228] truncate">{f.name}</p>
                  <p className="text-[8px] text-[#B89B93]">{(f.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <button onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#4A3228] rounded-full text-white hidden group-hover:flex items-center justify-center">
                  <X size={8} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" disabled={loading}
        className="flex items-center gap-2 bg-[#4A3228] text-white text-[13px] font-semibold px-7 py-3.5 rounded-sm hover:bg-[#3a2820] disabled:opacity-55 transition-all">
        {loading ? <><Loader2 size={14} className="animate-spin" /> Enviando…</> : t("cont_send_btn")}
      </button>
    </form>
  );
}
