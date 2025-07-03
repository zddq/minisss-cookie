///<reference types="./global.d.ts" />

import type { GetServerSidePropsContext } from "next";

/**
 * 浏览器/SSR-nextjs cookie 操作
 */
declare const MiniCookie: IStatic<IMiniCookieData, GetServerSidePropsContext>;
export default MiniCookie
