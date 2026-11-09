const DIRECTIVE_NAMES = {
    defaultSrc: "default-src",
    scriptSrc: "script-src",
    styleSrc: "style-src",
    imgSrc: "img-src",
    fontSrc: "font-src",
    connectSrc: "connect-src",
    frameAncestors: "frame-ancestors",
    baseUri: "base-uri",
    formAction: "form-action",
    objectSrc: "object-src",
    reportUri: "report-uri",
};
export function buildCspHeader(directives, nonce) {
    const parts = [];
    for (const [key, headerName] of Object.entries(DIRECTIVE_NAMES)) {
        const values = directives[key];
        if (!values?.length)
            continue;
        let resolved = [...values];
        if (nonce && key === "scriptSrc" && !resolved.includes("'nonce-")) {
            resolved = [`'nonce-${nonce}'`, ...resolved];
        }
        parts.push(`${headerName} ${resolved.join(" ")}`);
    }
    return parts.join("; ");
}
export function generateNonce() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString("base64");
}
//# sourceMappingURL=csp.js.map