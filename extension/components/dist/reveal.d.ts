export type RevealProps = {
    when: boolean | (() => boolean);
    fallback?: any;
    children?: any;
};
export declare const If: any;
export declare const Else: any;
export declare const Reveal: {
    (props: RevealProps): any;
    If: typeof If;
    Else: typeof Else;
};
