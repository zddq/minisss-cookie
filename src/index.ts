import serialize from "./cookie-serialize";
import parse from "./cookie-parse";
import get from "./cookie-get";
import set from "./cookie-set";
import del from "./cookie-del";
import has from "./cookie-has";
import PKG from "../package.json";

/**
 * @name cookie-操作类
 * @param config 配置
 */
class MCookie<MCD extends IMiniCookieData> {
  VERSION = PKG.version;
  private config: Partial<IConfig> = {};
  constructor(config: IConfig = {}) {
    this.config = config;
  }
  /**
   * @name cookie-获取
   * @param key 键
   * @param config 配置
   * @return {MCD[K]} 对应键值
   */
  get<K extends keyof MCD>(key: K, config: IConfig = {}): MCD[K] {
    return get(key, { ...this.config, ...config });
  }
  /**
   * @name cookie-设置
   * @param key 键
   * @param val 值
   * @param config 配置
   * @return boolean
   */
  set<K extends keyof MCD, V extends MCD[K]>(key: K, val: V, config: IConfig = {}): boolean {
    return set(key, val, { ...this.config, ...config });
  }
  /**
   * @name cookie-删除
   * @param key 键值
   * @param config 配置
   * @returns boolean
   */
  del<K extends keyof MCD>(key: K, config: IConfig = {}) {
    return del(key, { ...this.config, ...config, maxAge: -1 });
  }
  /**
   * @name cookie-是否存在
   * @param key 键值
   * @param config 配置
   */
  has<K extends keyof MCD>(key: K, config: IConfig = {}) {
    return has(key, { ...this.config, ...config });
  }
  /**
   * @name cookie-对象序列化成字符串
   * @param key 键值
   * @param val 数据值
   * @param config 配置
   * @returns string
   */
  serialize(key: string, val: any, config: IConfig = {}): string {
    return serialize(key, val, { ...this.config, ...config });
  }
  /**
   * @name cookie-字符串解析成对象
   * @param cookieStr cookie字符串
   * @returns Object
   */
  parse<O extends MCD>(cookieStr: string): O {
    return parse(cookieStr) as O;
  }
}

export default {
  VERSION: PKG.version,
  create: (config: IConfig = {}) => new MCookie(config),
  get,
  set,
  del,
  has,
  serialize,
  parse,
};
