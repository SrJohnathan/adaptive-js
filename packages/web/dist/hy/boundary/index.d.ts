export { createBoundaryComponent, isClientComponent } from "./factory.js";
export { describeCollectedOrigin } from "./collect.js";
export declare function hydrateClientComponents(moduleId: string, exportsMap: Record<string, any>): void;
export declare function wrapHydratePropsForServer(props: Record<string, any>): Record<string, any>;
