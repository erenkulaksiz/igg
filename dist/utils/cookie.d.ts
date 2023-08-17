import type { IgApiClient } from "instagram-private-api";
export declare function saveCookie(cookie: any, username: string): Promise<void>;
export declare function getCookie(username: string): Promise<void | string>;
export declare function removeCookie(username: string): Promise<void>;
export declare function checkCookie(ig: IgApiClient, username?: string): Promise<{
    shouldLogin: boolean;
}>;
//# sourceMappingURL=cookie.d.ts.map