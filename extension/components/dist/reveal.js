function createMarker(type) {
    const Marker = (props) => {
        return props.children ?? null;
    };
    Marker._revealType = type;
    return Marker;
}
export const If = createMarker("if");
export const Else = createMarker("else");
function extractBranches(children, fallback) {
    let ifBranch = null;
    let elseBranch = fallback ?? null;
    if (children == null)
        return { ifBranch, elseBranch };
    const list = Array.isArray(children) ? children.flat(Infinity) : [children];
    let hasMarker = false;
    for (const child of list) {
        if (child == null || child === false || child === true)
            continue;
        const tag = child?.tag;
        const t = tag?._revealType;
        if (t === "if") {
            hasMarker = true;
            ifBranch =
                child.props?.children ??
                    child.children ??
                    null;
        }
        else if (t === "else") {
            hasMarker = true;
            elseBranch =
                child.props?.children ??
                    child.children ??
                    null;
        }
    }
    if (!hasMarker) {
        // uso antigo: <Reveal><Test /></Reveal>
        ifBranch = children;
    }
    return { ifBranch, elseBranch };
}
function withBranchKey(node, key) {
    if (node == null || node === false || node === true)
        return node;
    // lista: aplica no único filho relevante ou envolve
    if (Array.isArray(node)) {
        const list = node.flat(Infinity).filter((v) => v != null && v !== false && v !== true);
        if (list.length === 1)
            return withBranchKey(list[0], key);
        return list.map((v, i) => withBranchKey(v, `${key}-${i}`));
    }
    // vnode Adaptive { tag, props, children }
    if (typeof node === "object" && node.tag != null) {
        return {
            ...node,
            props: { ...(node.props ?? {}), key },
        };
    }
    // texto / número → envolve em fragment com key via props fake não ajuda;
    // para texto puro o keyed block pode usar a própria key string:
    return { tag: "Fragment", props: { key }, children: [node] };
}
function RevealFn(props) {
    return (() => {
        const raw = props.when;
        const show = typeof raw === "function" ? raw() : !!raw;
        const { ifBranch, elseBranch } = extractBranches(props.children, props.fallback);
        return show
            ? withBranchKey(ifBranch ?? null, "on")
            : withBranchKey(elseBranch ?? null, "off");
    });
}
export const Reveal = RevealFn;
Reveal.If = If;
Reveal.Else = Else;
//# sourceMappingURL=reveal.js.map