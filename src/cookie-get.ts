import parse from "./cookie-parse";

/**
 * cookie 获取
 * @param key 键
 * @param config 配置
 * @returns 对应键值
 */
export default function (key: any, config: IConfig = {}) {
  try {
    // SSR Next.js
    if (typeof window === "undefined") {
      if (!config.ctx) {
        return "";
      }

      return parse(config.ctx.req.headers.cookie || "")[key];
    }

    return parse(document.cookie)[key];
  } catch (err) {
    console.error("cookie get err:", err);
    return parse("")[key];
  }
}
