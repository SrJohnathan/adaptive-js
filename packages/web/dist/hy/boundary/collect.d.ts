export declare function collectHydrationBindings(Component?: (props?: Record<string, any>) => any, props?: Record<string, any>, moduleId?: string): {
    events: Map<any, any>;
    refs: Map<any, any>;
    reactive: Map<any, any>;
    dynamicProps: Map<any, any>;
    layoutEffects: any[];
    effects: any[];
    unsupportedFeatures: string[];
    paths: Map<string, string>;
};
export declare function describeCollectedOrigin(collected: unknown, key: string): string | undefined;
