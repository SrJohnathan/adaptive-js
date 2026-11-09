import type { Plugin } from "rolldown";
export interface BoundariesOptions {
    /** Diretiva repetida sob o mesmo modo (escopo reativo novo). Padrão: "warn". */
    redundantDirective?: "warn" | "off";
}
export declare function adaptiveBoundariesPlugin(options?: BoundariesOptions): Plugin;
