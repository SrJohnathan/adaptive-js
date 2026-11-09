export const ENABLED_CLIENT_FLAG = "ADAPTIVE_ENABLED_CLIENT";

export function isClientEnabled(): boolean {
    const g = globalThis as any;
    const env = g.process?.env ?? g.__ADAPTIVE_FLAGS__ ?? g.__ADAPTIVE_ENV__ ?? {};

    let value: unknown = env?.[ENABLED_CLIENT_FLAG];

    try {
        // @ts-ignore
        const metaEnv = (typeof import.meta !== "undefined" && (import.meta as any).env)
            ? (import.meta as any).env[ENABLED_CLIENT_FLAG] : undefined;
        if (value === undefined && metaEnv !== undefined) value = metaEnv;
    } catch {}

    try {
        const winEnv = g.window?.__ADAPTIVE_ENV__?.[ENABLED_CLIENT_FLAG];
        if (value === undefined && winEnv !== undefined) value = winEnv;
    } catch {}

    // undefined => ligada por padrão
    if (value === undefined) return true;
    // boolean direto
    if (typeof value === "boolean") return value;
    // string: "0" ou "false" desliga, ignorando caixa e espaco nas bordas
    const str = String(value).toLowerCase().trim();
    return str !== "0" && str !== "false";
}

export function buildPlaceholder(moduleId: string, exportName: string) {
    const hue = Math.floor(Math.random() * 360);
    return {
        tag: "div",
        props: {
            "data-adaptive-client-placeholder": "",
            "data-adaptive-disabled": "true",
            style: {
                backgroundColor: `hsl(${hue} 70% 55%)`,
                color: "#fff",
                padding: "2px 8px",
                display: "inline-block",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "12px",
                width: "100%",
                height: "100%",

            },
        },
        children: [`client island disabled · ${moduleId} · ${exportName}`],
    };
}