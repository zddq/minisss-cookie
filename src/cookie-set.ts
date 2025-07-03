import serialize from "./cookie-serialize";

/**
 * cookie 设置
 * @param key 键
 * @param val 值
 * @param config 配置
 * @returns boolean
 */
export default function (key: any, val: any, config: IConfig = {}) {
  try {
    const setCookieStr = serialize(String(key), val, config);

    // SSR Next.js
    if (typeof window === "undefined") {
      if (!config.ctx) return false;

      config.ctx.res.setHeader("'Set-Cookie'", setCookieStr);
      return true;
    }

    if (config.httpOnly) {
      throw new Error("Can not set a httpOnly cookie in the browser.");
    }

    document.cookie = setCookieStr;
    return true;
  } catch (err) {
    console.error("cookie set err:", err);
    return false;
  }
}
