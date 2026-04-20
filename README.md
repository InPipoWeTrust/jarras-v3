# 🪵 Maderas del Sur — v3

Proyecto web centrado en el configurador de jarras artesanales.
**Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui**

---

## 📁 Estructura

```
jarras-v3/
├── app/
│   ├── layout.tsx             # Navbar + fuentes
│   ├── page.tsx               # Home: video hero + configurador
│   ├── globals.css
│   ├── historia/page.tsx      # Página Historia
│   └── contacto/page.tsx      # Página Contacto
├── components/
│   ├── Navbar.tsx             # Navbar fija, transparente sobre el video
│   ├── JarraConfigurator.tsx  # ⭐ Configurador principal
│   ├── FileUpload.tsx         # Upload drag&drop, 10MB, preview
│   ├── ContactForm.tsx        # Formulario (React Hook Form + Zod)
│   └── ContactFormWrapper.tsx # Lee URL params del configurador
├── lib/
│   ├── configurator-data.ts   # Todos los pasos, opciones y precios
│   └── utils.ts               # cn() helper
└── public/
    └── (pon aquí tu video.mp4)
```

---

## 🎬 Cómo añadir el vídeo de fondo

1. Coloca tu vídeo en `/public/video.mp4` (y opcionalmente `/public/video.webm`)
2. Abre `app/page.tsx` y descomenta las líneas del `<source>`:
   ```tsx
   <source src="/video.webm" type="video/webm" />
   <source src="/video.mp4" type="video/mp4" />
   ```
3. Actualiza el atributo `poster` con una foto estática de tu jarra

**Recomendaciones para el vídeo:**
- Duración: 15–30 segundos en loop
- Resolución: 1920×1080 mínimo
- Formato: MP4 (H.264) + WebM (VP9) para compatibilidad
- Tamaño: < 10 MB para carga rápida (comprime con HandBrake o FFmpeg)
- Evitar audio (está muted, pero mejor sin pista de audio)

```bash
# Comprimir con FFmpeg:
ffmpeg -i original.mp4 -vcodec libx264 -crf 28 -preset slow -an public/video.mp4
ffmpeg -i original.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an public/video.webm
```

---

## 🚀 Instalación local

```bash
cd jarras-v3
npm install
npm run dev
# Abre http://localhost:3000
```

---

## 🌐 Deploy en Vercel (gratis)

```bash
# Opción CLI:
npm i -g vercel
vercel

# O desde vercel.com → Add New Project → importa tu repo GitHub
```

---

## 📧 Activar envío real de emails

En `components/ContactForm.tsx`, reemplaza el `console.log` por una llamada a tu API:

### Con Resend (recomendado):
```bash
npm install resend
```

Crea `app/api/contact/route.ts`:
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  await resend.emails.send({
    from: 'web@maderasdelsur.com',
    to: 'hola@maderasdelsur.com',
    subject: `Nuevo pedido de ${body.nombre}`,
    text: `${body.mensaje}\n\nEmail: ${body.email}\nPaís: ${body.pais}\nTel: ${body.telefono ?? 'no indicado'}\nWhatsApp: ${body.whatsapp}`,
  });
  return Response.json({ ok: true });
}
```

En `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## 🎨 Personalización

| Qué cambiar | Dónde |
|---|---|
| Pasos, opciones y precios del configurador | `lib/configurator-data.ts` |
| Colores globales | `tailwind.config.ts` + `app/globals.css` |
| Nombre de la marca | busca "Maderas del Sur" |
| Imágenes de opciones | campo `image` en `lib/configurator-data.ts` |
| Datos de contacto | `app/contacto/page.tsx` + `app/page.tsx` |
| Texto historia | `app/historia/page.tsx` |
