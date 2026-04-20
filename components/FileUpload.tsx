"use client";

import { useCallback, useRef, useState } from "react";
import { X, Upload, ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constantes ───────────────────────────────────────────────────────────────
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/heic"];
const ACCEPTED_EXT = ".jpg,.jpeg,.png,.webp,.gif,.svg,.heic";

interface UploadedFile {
  file: File;
  preview: string; // URL.createObjectURL
  id: string;      // unique id para la key de React
}

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export default function FileUpload({ files, onChange }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validar y añadir archivos
  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const newErrors: string[] = [];
    const toAdd: UploadedFile[] = [];

    Array.from(incoming).forEach((file) => {
      // Validar tipo
      if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(heic|heif)$/i)) {
        newErrors.push(`"${file.name}": tipo de archivo no permitido. Solo imágenes.`);
        return;
      }
      // Validar tamaño
      if (file.size > MAX_FILE_SIZE_BYTES) {
        newErrors.push(`"${file.name}": supera el límite de ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
      // Evitar duplicados por nombre+tamaño
      const isDupe = uploadedFiles.some((u) => u.file.name === file.name && u.file.size === file.size);
      if (isDupe) {
        newErrors.push(`"${file.name}": ya está añadido.`);
        return;
      }
      toAdd.push({ file, preview: URL.createObjectURL(file), id: `${Date.now()}-${Math.random()}` });
    });

    setErrors(newErrors);
    if (!toAdd.length) return;

    setUploadedFiles((prev) => {
      const next = [...prev, ...toAdd];
      onChange(next.map((u) => u.file));
      return next;
    });
  }, [uploadedFiles, onChange]);

  // Eliminar un archivo
  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((u) => u.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      const next = prev.filter((u) => u.id !== id);
      onChange(next.map((u) => u.file));
      return next;
    });
  };

  // Drag & drop handlers
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };

  return (
    <div className="space-y-3">
      {/* Zona de drop */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-sm px-6 py-8 text-center cursor-pointer transition-all duration-200",
          dragging
            ? "border-[#5C4033] bg-[#5C4033]/5 scale-[1.01]"
            : "border-[#8D6E63]/40 hover:border-[#8D6E63]/70 hover:bg-[#F5EDE1]/60"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXT}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-[#8D6E63]/12 flex items-center justify-center">
            <Upload size={18} className="text-[#8D6E63]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#5C4033]">
              Arrastra tus imágenes aquí o{" "}
              <span className="underline underline-offset-2">haz clic para seleccionar</span>
            </p>
            <p className="text-xs text-[#8D6E63]/70 mt-1">
              JPG, PNG, WEBP, GIF, SVG · Máx. {MAX_FILE_SIZE_MB} MB por archivo
            </p>
          </div>
        </div>
      </div>

      {/* Errores de validación */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-sm">
              <AlertCircle size={13} className="shrink-0 mt-0.5" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Vista previa de archivos subidos */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#8D6E63] tracking-wide uppercase">
            {uploadedFiles.length} {uploadedFiles.length === 1 ? "archivo" : "archivos"} subido{uploadedFiles.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {uploadedFiles.map((uf) => (
              <div
                key={uf.id}
                className="group relative bg-white border border-[#8D6E63]/15 rounded-sm overflow-hidden"
              >
                {/* Preview */}
                {uf.file.type.startsWith("image/") ? (
                  <img
                    src={uf.preview}
                    alt={uf.file.name}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="w-full h-24 flex items-center justify-center bg-[#F0E3D0]">
                    <ImageIcon size={28} className="text-[#8D6E63]" />
                  </div>
                )}
                {/* Info */}
                <div className="px-2 py-1.5">
                  <p className="text-[10px] font-medium text-[#5C4033] truncate">{uf.file.name}</p>
                  <p className="text-[9px] text-[#8D6E63]/70">{(uf.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {/* Botón eliminar */}
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(uf.id); }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#5C4033] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Eliminar ${uf.file.name}`}
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
