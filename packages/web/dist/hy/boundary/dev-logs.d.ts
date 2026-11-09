export declare const ENABLED_CLIENT_FLAG = "ADAPTIVE_ENABLED_CLIENT";
export declare function isClientEnabled(): boolean;
export declare function buildPlaceholder(moduleId: string, exportName: string): {
    tag: string;
    props: {
        "data-adaptive-client-placeholder": string;
        "data-adaptive-disabled": string;
        style: {
            backgroundColor: string;
            color: string;
            padding: string;
            display: string;
            borderRadius: string;
            fontFamily: string;
            fontSize: string;
            width: string;
            height: string;
        };
    };
    children: string[];
};
