import parse from "./cookie-parse";

/**
 * cookie 是否存在
 * @param key 键
 * @param config 配置
 * @returns boolean
 */
export default function (key: any, config: IConfig = {}) {
  try {
    // SSR Next.js
    if (typeof window === "undefined") {
      if (!config.ctx) {
        return false;
      }
      return !!parse(config.ctx!.req.headers.cookie || "")[key];
    }

    return !!parse(document.cookie)[key];
  } catch (err) {
    console.error("cookie has err:", err);
    return false;
  }
}
