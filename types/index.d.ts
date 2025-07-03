///<reference types="./global.d.ts" />

import type { GetServerSidePropsContext } from "next";

/**
 * MSCookie 提供 浏览器 与 Next.js 统一 Cookie API 接口调用
 * @description 推荐 MSCookie.create() 创建实例, 统一初始化配置, 避免重复配置
 */
declare const MSCookie: IMSCookieStatic<IMSCookieData, GetServerSidePropsContext>;
export default MSCookie;
