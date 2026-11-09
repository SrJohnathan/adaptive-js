import { type ClientComponentFunction } from "@adaptive-js/shared";
export declare function createBoundaryComponent({ mode, moduleId, exportName, serverRender, wrapServerProps }: {
    mode: string;
    moduleId: string;
    exportName: string;
    serverRender?: ((props?: Record<string, any>) => any) | null;
    wrapServerProps?: (props: Record<string, any>) => Record<string, any>;
}): ClientComponentFunction;
export declare function isClientComponent(value: unknown): value is ClientComponentFunction;
