export { CONTEXT_PROVIDER_TAG } from "@adaptive-js/shared";
export type AdaptiveContext<T> = {
    id: symbol;
    defaultValue: T;
};
export declare function createContext<T>(defaultValue: T): {
    Provider: (props: {
        value: T;
        children?: any;
    }) => {
        tag: symbol;
        props: {
            context: AdaptiveContext<T>;
            value: T;
        };
        children: any;
    };
    _context: AdaptiveContext<T>;
};
export declare function useContext<T>(context: {
    _context: AdaptiveContext<T>;
}): T;
