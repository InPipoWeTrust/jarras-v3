import { LANGS, type Lang } from "./i18n";

export interface ConfigOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  isCustomUpload?: boolean;
}

export interface ConfigStep {
  id: keyof ConfigState;
  title: string;
  subtitle: string;
  options: ConfigOption[];
}

export interface ConfigState {
  modelo: string;
  madera: string;
  grabado: string;
  acero: string;
  acabado: string;
}

export const INITIAL_STATE: ConfigState = {
  modelo: "estandar", madera: "roble", grabado: "ninguno",
  acero: "plateado", acabado: "cera",
};

const P = (seed: string) => `https://picsum.photos/seed/${seed}/800/900`;

export function getSteps(lang: Lang): ConfigStep[] {
  const L = LANGS[lang];
  return [
    {
      id: "modelo", title: L.step_modelo.title, subtitle: L.step_modelo.sub,
      options: [
        { id: "compacta", price: 35, image: P("jarra-compacta-350-rustica"), ...L.step_modelo.opts.compacta, description: L.step_modelo.opts.compacta.desc },
        { id: "estandar", price: 45, image: P("jarra-estandar-500-artesanal"), ...L.step_modelo.opts.estandar, description: L.step_modelo.opts.estandar.desc },
        { id: "grande",   price: 58, image: P("jarra-grande-750-madera"),     ...L.step_modelo.opts.grande,   description: L.step_modelo.opts.grande.desc },
      ],
    },
    {
      id: "madera", title: L.step_madera.title, subtitle: L.step_madera.sub,
      options: [
        { id: "pino",   price: 0,  image: P("madera-pino-clara-veta"),       ...L.step_madera.opts.pino,   description: L.step_madera.opts.pino.desc },
        { id: "roble",  price: 5,  image: P("madera-roble-grano-clasico"),   ...L.step_madera.opts.roble,  description: L.step_madera.opts.roble.desc },
        { id: "cerezo", price: 8,  image: P("madera-cerezo-calida"),         ...L.step_madera.opts.cerezo, description: L.step_madera.opts.cerezo.desc },
        { id: "nogal",  price: 10, image: P("madera-nogal-oscura"),          ...L.step_madera.opts.nogal,  description: L.step_madera.opts.nogal.desc },
        { id: "olivo",  price: 15, image: P("madera-olivo-dorada-rara"),     ...L.step_madera.opts.olivo,  description: L.step_madera.opts.olivo.desc },
      ],
    },
    {
      id: "grabado", title: L.step_grabado.title, subtitle: L.step_grabado.sub,
      options: [
        { id: "ninguno",      price: 0,  image: P("jarra-sin-grabado-natural"),      ...L.step_grabado.opts.ninguno,      description: L.step_grabado.opts.ninguno.desc },
        { id: "texto",        price: 8,  image: P("grabado-texto-laser"),            ...L.step_grabado.opts.texto,        description: L.step_grabado.opts.texto.desc },
        { id: "icono",        price: 10, image: P("grabado-icono-simple"),           ...L.step_grabado.opts.icono,        description: L.step_grabado.opts.icono.desc },
        { id: "floral",       price: 15, image: P("grabado-floral-laser"),           ...L.step_grabado.opts.floral,       description: L.step_grabado.opts.floral.desc },
        { id: "geometrico",   price: 18, image: P("grabado-geometrico-mandala"),     ...L.step_grabado.opts.geometrico,   description: L.step_grabado.opts.geometrico.desc },
        { id: "ilustracion",  price: 25, image: P("grabado-ilustracion-compleja"),   ...L.step_grabado.opts.ilustracion,  description: L.step_grabado.opts.ilustracion.desc },
        { id: "personalizado",price: 30, image: P("grabado-upload-custom"),          ...L.step_grabado.opts.personalizado, description: L.step_grabado.opts.personalizado.desc, isCustomUpload: true },
      ],
    },
    {
      id: "acero", title: L.step_acero.title, subtitle: L.step_acero.sub,
      options: [
        { id: "plateado", price: 0, image: P("acero-plateado-clasico"), ...L.step_acero.opts.plateado, description: L.step_acero.opts.plateado.desc },
        { id: "negro",    price: 5, image: P("acero-negro-mate"),       ...L.step_acero.opts.negro,    description: L.step_acero.opts.negro.desc },
        { id: "cobre",    price: 8, image: P("acero-cobre-calido"),     ...L.step_acero.opts.cobre,    description: L.step_acero.opts.cobre.desc },
      ],
    },
    {
      id: "acabado", title: L.step_acabado.title, subtitle: L.step_acabado.sub,
      options: [
        { id: "cera",     price: 0, image: P("acabado-cera-abeja"),    ...L.step_acabado.opts.cera,     description: L.step_acabado.opts.cera.desc },
        { id: "satinado", price: 5, image: P("acabado-barniz"),        ...L.step_acabado.opts.satinado, description: L.step_acabado.opts.satinado.desc },
        { id: "tung",     price: 7, image: P("acabado-aceite-tung"),   ...L.step_acabado.opts.tung,     description: L.step_acabado.opts.tung.desc },
      ],
    },
  ];
}

export function calcTotal(state: ConfigState, steps: ConfigStep[]): number {
  return steps.reduce((total, step) => {
    const opt = step.options.find((o) => o.id === state[step.id]);
    return total + (opt?.price ?? 0);
  }, 0);
}

export function priceLabel(opt: ConfigOption, stepId: string, included: string): string {
  if (stepId === "modelo") return `${opt.price} €`;
  return opt.price === 0 ? included : `+${opt.price} €`;
}

export function buildSummary(
  state: ConfigState,
  steps: ConfigStep[],
  files: File[],
  strings: { intro: string; price: string; filesLabel: string; question: string }
): string {
  const lines = [strings.intro];
  steps.forEach((step) => {
    const opt = step.options.find((o) => o.id === state[step.id]);
    if (opt) lines.push(`• ${step.title}: ${opt.name}`);
  });
  lines.push(`\n${strings.price}: ${calcTotal(state, steps)} €`);
  if (files.length > 0) {
    lines.push(`\n${strings.filesLabel} (${files.length}):`);
    files.forEach((f) => lines.push(`  – ${f.name}`));
  }
  lines.push("\n" + strings.question);
  return lines.join("\n");
}
