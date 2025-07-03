/** 特殊字符匹配 */
const RE_specialContent = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

function isDate(val: any) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

/**
 * @name cookie-序列化
 * @param key 键值
 * @param val 数据值
 * @param config 配置
 * @returns string
 */
export default function (key: string, val: any, config: IConfig = {}): string {
  const opt = config || {};

  if (!RE_specialContent.test(key)) {
    throw new TypeError("argument name is invalid");
  }

  const value = encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val).trim());
  if (value && !RE_specialContent.test(value)) {
    throw new TypeError("argument val is invalid");
  }

  let str = `${key}=${value}`;
  if (opt.domain) {
    if (!RE_specialContent.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += `; Domain=${opt.domain}`;
  }

  if (opt.path) {
    if (!RE_specialContent.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += `; Path=${opt.path}`;
  }

  if (opt.expires) {
    if (!isDate(opt.expires)) {
      throw new TypeError("option expires is invalid");
    }
    str += `; Expires=${opt.expires.toUTCString()}`;
  }

  if (typeof opt.maxAge === "number") {
    if (isNaN(opt.maxAge) || !isFinite(opt.maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += `; Max-Age=${Math.floor(opt.maxAge)}`;
  }

  if (opt.httpOnly) {
    str += `; HttpOnly`;
  }

  if (opt.secure) {
    str += `; Secure`;
  }

  if (opt.sameSite) {
    if (opt.sameSite !== "Strict" && opt.sameSite !== "Lax" && opt.sameSite !== "None") {
      throw new TypeError("option sameSite invalid, sameSite must be Strict | Lax |None");
    }
    str += `; SameSite=${opt.sameSite}`;
  }

  if (opt.partitioned) {
    str += `; Partitioned`;
  }

  if (opt.priority) {
    if (opt.priority !== "High" && opt.priority !== "Medium" && opt.priority !== "Low") {
      throw new TypeError("option priority invalid, priority muse be High | Medium | Low");
    }
    str += `; Priority=${opt.priority}`;
  }

  return str;
}
