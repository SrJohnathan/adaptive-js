import { RouteDefinition } from "@adaptive-js/shared";
import { AdaptiveRouteRequest } from "./interfaces/index.js";
export declare function createRouter(url: string, routes?: RouteDefinition[], options?: {
    isProduction?: boolean;
    sourceDir?: string;
    serverBuildDir?: string;
    clientBuildDir?: string;
    freshServerModules?: boolean;
    request?: AdaptiveRouteRequest;
}): Promise<any>;
