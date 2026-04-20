"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "es" | "ca" | "en";

// ─── Traducciones ─────────────────────────────────────────────────────────────
export const LANGS = {
  es: {
    nav_historia: "Historia", nav_contacto: "Contacto", nav_cta: "Crear mi jarra",
    hero_h1: "La jarra que\nimaginas",
    hero_h1_em: "imaginas",
    hero_sub: "Madera natural, acero inoxidable y grabado láser. Hecha a mano en Andalucía, diseñada por ti.",
    hero_btn: "Diseñar mi jarra →",
    conf_eyebrow: "Configurador", conf_title: "Crea tu jarra",
    conf_sub: "Elige cada detalle. Cuando lo tengas listo, solicítala y te confirmamos en 24 horas.",
    conf_live: "Vista en vivo",
    ctabar_ey: "¿Alguna pregunta?", ctabar_h2: "Hablamos sin compromiso",
    ctabar_p: "Escríbenos. Una persona del taller te responde en menos de 24 horas.", ctabar_btn: "Escribirnos →",
    mob_lbl: "Precio estimado", mob_btn: "Solicitar →",
    cta_ey: "Precio estimado", cta_note: "Orientativo · el definitivo se confirma al solicitar",
    cta_btn: "Solicitar esta jarra →", cta_resp: "Respondemos en menos de 24 horas",
    included: "Incluido",
    upload_lbl: "Sube tus imágenes de referencia",
    upload_txt: "Arrastra aquí o haz clic",
    upload_hint: "JPG, PNG, WEBP, GIF · Máx. 10 MB",
    hist_eyebrow: "Quiénes somos",
    hist_h1_a: "Una familia,", hist_h1_b: "un taller",
    hist_h2_1: "Empezó en un garaje",
    hist_p_1: "Todo comenzó en 2014 con una tabla de roble, unas herramientas heredadas del abuelo y la idea de hacer algo con las manos que mereciera la pena conservar. Las primeras jarras tenían sus imperfecciones, pero tenían alma. Y eso es lo que hemos protegido con los años.",
    hist_h2_2: "El láser llega al taller",
    hist_p_2: "En 2017 incorporamos nuestra primera máquina de grabado láser — no para ir más rápido, sino para poder trasladar diseños con una precisión que a mano nunca alcanzaríamos. Cada pieza sigue pasando por las mismas manos antes y después del láser.",
    hist_quote: "Una jarra artesanal no es solo un objeto. Es el tiempo y la atención de alguien que se tomó en serio hacerla para ti.",
    hist_h2_3: "Hoy",
    hist_p_3: "Trabajamos con madera de origen certificado — roble, nogal, cerezo, olivo — y acero inoxidable 18/8. Seguimos siendo un taller pequeño y familiar, y no tenemos ninguna intención de dejar de serlo.",
    hist_cta: "Diseña la tuya →",
    cont_eyebrow: "Estamos aquí", cont_h1: "Cuéntanos",
    cont_form_title: "Escríbenos",
    cont_form_sub: "Una persona del taller te responde en menos de 24 horas.",
    cont_name_lbl: "Nombre", cont_name_ph: "Tu nombre", cont_err_name: "Mínimo 2 caracteres",
    cont_email_lbl: "Correo", cont_email_ph: "tucorreo@ejemplo.com", cont_err_email: "Email no válido",
    cont_country_lbl: "País", cont_country_ph: "España, México, Argentina…", cont_err_country: "Indica tu país",
    cont_wa_text: "Prefiero que me contactéis por WhatsApp",
    cont_wa_note: "Solo escribimos — nunca llamamos sin avisar antes.",
    cont_tel_lbl: "Tu número de WhatsApp", cont_err_tel: "Introduce tu número",
    cont_msg_lbl: "Mensaje", cont_msg_ph: "Cuéntanos qué tienes en mente…", cont_err_msg: "Al menos 10 caracteres",
    cont_files_lbl: "Adjuntar imágenes de referencia",
    cont_files_hint: "opcional · máx. 20 MB por archivo",
    cont_dz_txt: "Arrastra aquí o haz clic para seleccionar",
    cont_dz_hint: "JPG, PNG, WEBP, GIF, SVG, PDF · Máx. 20 MB por archivo",
    cont_send_btn: "Enviar mensaje",
    cont_suc_h: "Mensaje recibido",
    cont_suc_p: "Gracias por escribirnos. Te respondemos en menos de 24 horas laborables.",
    cont_suc_again: "Enviar otro mensaje",
    pf_lbl: "Desde el configurador",
    pf_txt: "Hemos rellenado el mensaje con tu configuración. Revísalo antes de enviarlo.",
    trust_h: "Trato directo y cercano",
    trust_p: "Cuando escribes, te responde una persona del taller. Sin chatbots, sin llamadas no esperadas.",
    info_email: "Email", info_wa: "WhatsApp / Tel.", info_hours: "Horario",
    summary_intro: "Mi configuración:\n",
    summary_price: "Precio estimado",
    summary_files: "Archivos adjuntos",
    summary_q: "¿Podéis confirmar disponibilidad y plazo?",
    step_modelo: {
      title: "Modelo y tamaño", sub: "El tamaño determina el precio base.",
      opts: {
        compacta: { name: "Compacta", desc: "350 ml · Ligera, perfecta para regalar", badge: "" },
        estandar: { name: "Estándar", desc: "500 ml · El más equilibrado", badge: "La más pedida" },
        grande: { name: "Grande", desc: "750 ml · Para sobremesas largas", badge: "" },
      },
    },
    step_madera: {
      title: "Tipo de madera", sub: "Cada especie tiene su propio carácter y veta.",
      opts: {
        pino: { name: "Pino", desc: "Veta clara y luminosa", badge: "" },
        roble: { name: "Roble", desc: "Resistente y atemporal", badge: "" },
        cerezo: { name: "Cerezo", desc: "Tonos rojizos cálidos", badge: "" },
        nogal: { name: "Nogal", desc: "Oscuro y sofisticado", badge: "" },
        olivo: { name: "Olivo", desc: "Veta dorada, la más exclusiva", badge: "Exclusiva" },
      },
    },
    step_grabado: {
      title: "Grabado láser", sub: "Elige un diseño o sube el tuyo.",
      opts: {
        ninguno: { name: "Sin grabado", desc: "Madera natural, sin grabado", badge: "" },
        texto: { name: "Texto personalizado", desc: "Nombre, fecha o frase corta", badge: "" },
        icono: { name: "Ícono o símbolo", desc: "Montaña, corazón, brújula…", badge: "" },
        floral: { name: "Diseño floral", desc: "Ramas y flores con detalle", badge: "" },
        geometrico: { name: "Diseño geométrico", desc: "Mandalas o patrones precisos", badge: "" },
        ilustracion: { name: "Ilustración completa", desc: "Diseño complejo: celta, vikingo…", badge: "" },
        personalizado: { name: "Grabado personalizado", desc: "Sube tu propio diseño", badge: "Tu diseño" },
      },
    },
    step_acero: {
      title: "Interior de acero", sub: "Color del acero inoxidable 18/8.",
      opts: {
        plateado: { name: "Plateado", desc: "Clásico e intemporal", badge: "" },
        negro: { name: "Negro mate", desc: "Elegante y actual", badge: "" },
        cobre: { name: "Cobre", desc: "Cálido y exclusivo", badge: "" },
      },
    },
    step_acabado: {
      title: "Acabado exterior", sub: "Tratamiento final que protege la madera.",
      opts: {
        cera: { name: "Cera de abeja", desc: "Mate natural, tacto orgánico", badge: "" },
        satinado: { name: "Barniz satinado", desc: "Toque de brillo, fácil de limpiar", badge: "" },
        tung: { name: "Aceite de tung", desc: "Realza la veta al máximo", badge: "" },
      },
    },
  },
  ca: {
    nav_historia: "Història", nav_contacto: "Contacte", nav_cta: "Crear la meva gerra",
    hero_h1: "La gerra que\nimaginaves",
    hero_h1_em: "imaginaves",
    hero_sub: "Fusta natural, acer inoxidable i gravat làser. Feta a mà a Andalusia, dissenyada per tu.",
    hero_btn: "Dissenyar la meva gerra →",
    conf_eyebrow: "Configurador", conf_title: "Crea la teva gerra",
    conf_sub: "Tria cada detall. Quan estiguis llest, sol·licita-la i et confirmem en 24 hores.",
    conf_live: "Vista en viu",
    ctabar_ey: "Alguna pregunta?", ctabar_h2: "Parlem sense compromís",
    ctabar_p: "Escriu-nos. Una persona del taller et respon en menys de 24 hores.", ctabar_btn: "Escriu-nos →",
    mob_lbl: "Preu estimat", mob_btn: "Sol·licitar →",
    cta_ey: "Preu estimat", cta_note: "Orientatiu · el definitiu es confirma en sol·licitar",
    cta_btn: "Sol·licitar aquesta gerra →", cta_resp: "Et responem en menys de 24 hores",
    included: "Inclòs",
    upload_lbl: "Puja les teves imatges de referència",
    upload_txt: "Arrossega aquí o fes clic",
    upload_hint: "JPG, PNG, WEBP, GIF · Màx. 10 MB",
    hist_eyebrow: "Qui som",
    hist_h1_a: "Una família,", hist_h1_b: "un taller",
    hist_h2_1: "Va començar en un garatge",
    hist_p_1: "Tot va començar el 2014 amb una taula de roure, unes eines heretades de l'avi i la idea de fer alguna cosa amb les mans que valgués la pena conservar. Les primeres gerres tenien les seves imperfeccions, però tenien ànima. I això és el que hem protegit amb els anys.",
    hist_h2_2: "El làser arriba al taller",
    hist_p_2: "El 2017 vam incorporar la nostra primera màquina de gravat làser — no per anar més ràpid, sinó per poder traslladar dissenys amb una precisió que a mà mai no assoliríem. Cada peça continua passant per les mateixes mans abans i després del làser.",
    hist_quote: "Una gerra artesanal no és només un objecte. És el temps i l'atenció d'algú que es va prendre seriosament fer-la per a tu.",
    hist_h2_3: "Avui",
    hist_p_3: "Treballem amb fusta d'origen certificat — roure, noguer, cirerer, olivera — i acer inoxidable 18/8. Continuem sent un taller petit i familiar, i no tenim cap intenció de deixar de ser-ho.",
    hist_cta: "Dissenya la teva →",
    cont_eyebrow: "Som aquí", cont_h1: "Explica'ns",
    cont_form_title: "Escriu-nos",
    cont_form_sub: "Una persona del taller et respon en menys de 24 hores.",
    cont_name_lbl: "Nom", cont_name_ph: "El teu nom", cont_err_name: "Mínim 2 caràcters",
    cont_email_lbl: "Correu", cont_email_ph: "elteucorreu@exemple.com", cont_err_email: "Email no vàlid",
    cont_country_lbl: "País", cont_country_ph: "Espanya, Mèxic, Argentina…", cont_err_country: "Indica el teu país",
    cont_wa_text: "Prefereixo que em contacteu per WhatsApp",
    cont_wa_note: "Només escrivim — mai truquem sense avisar abans.",
    cont_tel_lbl: "El teu número de WhatsApp", cont_err_tel: "Introdueix el teu número",
    cont_msg_lbl: "Missatge", cont_msg_ph: "Explica'ns què tens en ment…", cont_err_msg: "Almenys 10 caràcters",
    cont_files_lbl: "Adjuntar imatges de referència",
    cont_files_hint: "opcional · màx. 20 MB per arxiu",
    cont_dz_txt: "Arrossega aquí o fes clic per seleccionar",
    cont_dz_hint: "JPG, PNG, WEBP, GIF, SVG, PDF · Màx. 20 MB per arxiu",
    cont_send_btn: "Enviar missatge",
    cont_suc_h: "Missatge rebut",
    cont_suc_p: "Gràcies per escriure'ns. Et responem en menys de 24 hores laborables.",
    cont_suc_again: "Enviar un altre missatge",
    pf_lbl: "Des del configurador",
    pf_txt: "Hem emplenat el missatge amb la teva configuració. Revisa'l abans d'enviar-lo.",
    trust_h: "Tracte directe i proper",
    trust_p: "Quan escrius, et respon una persona del taller. Sense chatbots, sense trucades no esperades.",
    info_email: "Email", info_wa: "WhatsApp / Tel.", info_hours: "Horari",
    summary_intro: "La meva configuració:\n",
    summary_price: "Preu estimat",
    summary_files: "Arxius adjunts",
    summary_q: "Podeu confirmar disponibilitat i termini?",
    step_modelo: {
      title: "Model i mida", sub: "La mida determina el preu base.",
      opts: {
        compacta: { name: "Compacta", desc: "350 ml · Lleugera, perfecta per regalar", badge: "" },
        estandar: { name: "Estàndard", desc: "500 ml · La més equilibrada", badge: "La més demanada" },
        grande: { name: "Gran", desc: "750 ml · Per a taules llargues", badge: "" },
      },
    },
    step_madera: {
      title: "Tipus de fusta", sub: "Cada espècie té el seu caràcter i veta propis.",
      opts: {
        pino: { name: "Pi", desc: "Veta clara i lluminosa", badge: "" },
        roble: { name: "Roure", desc: "Resistent i atemporal", badge: "" },
        cerezo: { name: "Cirerer", desc: "Tons rogenc càlids", badge: "" },
        nogal: { name: "Noguer", desc: "Fosc i sofisticat", badge: "" },
        olivo: { name: "Olivera", desc: "Veta daurada, la més exclusiva", badge: "Exclusiva" },
      },
    },
    step_grabado: {
      title: "Gravat làser", sub: "Tria un disseny o puja el teu.",
      opts: {
        ninguno: { name: "Sense gravat", desc: "Fusta natural, sense gravat", badge: "" },
        texto: { name: "Text personalitzat", desc: "Nom, data o frase curta", badge: "" },
        icono: { name: "Icona o símbol", desc: "Muntanya, cor, brúixola…", badge: "" },
        floral: { name: "Disseny floral", desc: "Branques i flors amb detall", badge: "" },
        geometrico: { name: "Disseny geomètric", desc: "Mandalas o patrons precisos", badge: "" },
        ilustracion: { name: "Il·lustració completa", desc: "Disseny complex: celta, viking…", badge: "" },
        personalizado: { name: "Gravat personalitzat", desc: "Puja el teu propi disseny", badge: "El teu disseny" },
      },
    },
    step_acero: {
      title: "Interior d'acer", sub: "Color de l'acer inoxidable 18/8.",
      opts: {
        plateado: { name: "Platejat", desc: "Clàssic i atemporal", badge: "" },
        negro: { name: "Negre mat", desc: "Elegant i actual", badge: "" },
        cobre: { name: "Coure", desc: "Càlid i exclusiu", badge: "" },
      },
    },
    step_acabado: {
      title: "Acabat exterior", sub: "Tractament final que protegeix la fusta.",
      opts: {
        cera: { name: "Cera d'abella", desc: "Mat natural, tacte orgànic", badge: "" },
        satinado: { name: "Vernís satinant", desc: "Toc de brillantor, fàcil de netejar", badge: "" },
        tung: { name: "Oli de tung", desc: "Realça la veta al màxim", badge: "" },
      },
    },
  },
  en: {
    nav_historia: "Our story", nav_contacto: "Contact", nav_cta: "Design my mug",
    hero_h1: "The mug you've been\nimagining",
    hero_h1_em: "imagining",
    hero_sub: "Natural wood, stainless steel and laser engraving. Handmade in Andalusia, designed by you.",
    hero_btn: "Design my mug →",
    conf_eyebrow: "Configurator", conf_title: "Create your mug",
    conf_sub: "Choose every detail. When you're ready, request it and we'll confirm within 24 hours.",
    conf_live: "Live preview",
    ctabar_ey: "Any questions?", ctabar_h2: "Let's talk, no strings attached",
    ctabar_p: "Write to us. Someone from the workshop replies within 24 hours.", ctabar_btn: "Get in touch →",
    mob_lbl: "Estimated price", mob_btn: "Request →",
    cta_ey: "Estimated price", cta_note: "Indicative · final price confirmed on request",
    cta_btn: "Request this mug →", cta_resp: "We reply within 24 hours",
    included: "Included",
    upload_lbl: "Upload your reference images",
    upload_txt: "Drag here or click to select",
    upload_hint: "JPG, PNG, WEBP, GIF · Max. 10 MB",
    hist_eyebrow: "Who we are",
    hist_h1_a: "A family,", hist_h1_b: "a workshop",
    hist_h2_1: "It started in a garage",
    hist_p_1: "It all began in 2014 with an oak plank, some tools inherited from grandfather, and the idea of making something by hand worth keeping. The first mugs had their imperfections, but they had soul. And that's what we've protected ever since.",
    hist_h2_2: "Laser arrives at the workshop",
    hist_p_2: "In 2017 we added our first laser engraving machine — not to go faster, but to achieve a precision that would be impossible by hand. Every piece still passes through the same hands before and after the laser.",
    hist_quote: "An artisan mug is not just an object. It's the time and care of someone who took making it seriously.",
    hist_h2_3: "Today",
    hist_p_3: "We work with certified-origin wood — oak, walnut, cherry, olive — and 18/8 food-grade stainless steel. We're still a small family workshop, and we have no intention of changing that.",
    hist_cta: "Design yours →",
    cont_eyebrow: "We're here", cont_h1: "Tell us",
    cont_form_title: "Write to us",
    cont_form_sub: "Someone from the workshop replies within 24 hours.",
    cont_name_lbl: "Name", cont_name_ph: "Your name", cont_err_name: "At least 2 characters",
    cont_email_lbl: "Email", cont_email_ph: "youremail@example.com", cont_err_email: "Invalid email",
    cont_country_lbl: "Country", cont_country_ph: "Spain, UK, Mexico…", cont_err_country: "Please enter your country",
    cont_wa_text: "I prefer to be contacted via WhatsApp",
    cont_wa_note: "We only message — we never call without letting you know first.",
    cont_tel_lbl: "Your WhatsApp number", cont_err_tel: "Please enter your number",
    cont_msg_lbl: "Message", cont_msg_ph: "Tell us what you have in mind…", cont_err_msg: "At least 10 characters",
    cont_files_lbl: "Attach reference images",
    cont_files_hint: "optional · max. 20 MB per file",
    cont_dz_txt: "Drag here or click to select",
    cont_dz_hint: "JPG, PNG, WEBP, GIF, SVG, PDF · Max. 20 MB per file",
    cont_send_btn: "Send message",
    cont_suc_h: "Message received",
    cont_suc_p: "Thanks for writing to us. We'll reply within 24 business hours.",
    cont_suc_again: "Send another message",
    pf_lbl: "From the configurator",
    pf_txt: "We've pre-filled the message with your configuration. Review it before sending.",
    trust_h: "Direct and personal service",
    trust_p: "When you write, a real person from the workshop replies. No chatbots, no unexpected calls.",
    info_email: "Email", info_wa: "WhatsApp / Phone", info_hours: "Hours",
    summary_intro: "My mug configuration:\n",
    summary_price: "Estimated price",
    summary_files: "Attached files",
    summary_q: "Can you confirm availability and lead time?",
    step_modelo: {
      title: "Model & size", sub: "The size determines the base price.",
      opts: {
        compacta: { name: "Compact", desc: "350 ml · Light, perfect as a gift", badge: "" },
        estandar: { name: "Standard", desc: "500 ml · The most popular size", badge: "Most requested" },
        grande: { name: "Large", desc: "750 ml · For long gatherings", badge: "" },
      },
    },
    step_madera: {
      title: "Wood type", sub: "Each species has its own grain, colour and character.",
      opts: {
        pino: { name: "Pine", desc: "Clear, luminous grain", badge: "" },
        roble: { name: "Oak", desc: "Durable and timeless", badge: "" },
        cerezo: { name: "Cherry", desc: "Warm reddish tones", badge: "" },
        nogal: { name: "Walnut", desc: "Dark and sophisticated", badge: "" },
        olivo: { name: "Olive", desc: "Golden grain, the most exclusive", badge: "Exclusive" },
      },
    },
    step_grabado: {
      title: "Laser engraving", sub: "Choose a design or upload your own.",
      opts: {
        ninguno: { name: "No engraving", desc: "Natural wood, no engraving", badge: "" },
        texto: { name: "Custom text", desc: "Name, date or short phrase", badge: "" },
        icono: { name: "Icon or symbol", desc: "Mountain, heart, compass…", badge: "" },
        floral: { name: "Floral design", desc: "Detailed branches and flowers", badge: "" },
        geometrico: { name: "Geometric design", desc: "Mandalas or precise patterns", badge: "" },
        ilustracion: { name: "Full illustration", desc: "Complex design: celtic, nordic…", badge: "" },
        personalizado: { name: "Custom engraving", desc: "Upload your own design", badge: "Your design" },
      },
    },
    step_acero: {
      title: "Steel interior", sub: "Colour of the 18/8 stainless steel interior.",
      opts: {
        plateado: { name: "Silver", desc: "Classic and timeless", badge: "" },
        negro: { name: "Matte black", desc: "Elegant and modern", badge: "" },
        cobre: { name: "Copper", desc: "Warm and exclusive", badge: "" },
      },
    },
    step_acabado: {
      title: "Exterior finish", sub: "Final treatment that protects the wood.",
      opts: {
        cera: { name: "Beeswax", desc: "Natural matte, organic feel", badge: "" },
        satinado: { name: "Satin varnish", desc: "Subtle sheen, easy to clean", badge: "" },
        tung: { name: "Tung oil", desc: "Enhances the grain to the fullest", badge: "" },
      },
    },
  },
} as const;

export type Translations = typeof LANGS.es;

// ─── Context ──────────────────────────────────────────────────────────────────
interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof Translations) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  t: (k) => LANGS.es[k] as string,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
  };

  const t = (k: keyof Translations): string => {
    const val = (LANGS[lang] as Translations)[k];
    return typeof val === "string" ? val : (LANGS.es[k] as string);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
