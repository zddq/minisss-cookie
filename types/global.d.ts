/**
 * @minisss/cookie 可配置参数
 */
interface IMSCookieConfig<CTX extends any = any> {
  /**
   * 可访问文档域名
   * @default 默认当前文档域名
   */
  domain?: string;
  /**
   * 可访问文档路径
   * @default 默认当前文档路径
   */
  path?: string;
  /**
   * 过期时间
   * @default 默认会话模式(当浏览器关闭后清除所有会话 cookie)
   */
  expires?: Date;
  /**
   * 最大存活时间(单位: s), maxAge 高于 expires
   * @default 默认会话模式(当浏览器关闭后清除所有会话 cookie)
   */
  maxAge?: number;
  /**
   * 阻止JS脚本获取该 cookie 值, 服务端设置有效, 客户端设置无效
   * @default false
   */
  httpOnly?: boolean;
  /**
   * 只允许 https 域名访问
   * @default false
   */
  secure?: boolean;
  /**
   * 当存储达上限时按权重由低到高清除
   * @property 高保留权重 - High
   * @property 中保留权重 - Medium
   * @property 低保留权重 - Low
   * @default 浏览器自带默认值
   */
  sameSite?: "Strict" | "Lax" | "None";
  /**
   * 是否开启 第一方集合(First-Party Set), 第一方集合（First-Party Set）允许一组相关的域名被视为同一个“第一方”，从而在这些域名之间共享Cookie和数据
   * @default 浏览器自带默认值
   */
  partitioned?: boolean;
  /**
   * 当存储达上限时按权重由低到高清除
   * @property 高保留权重 - High
   * @property 中保留权重 - Medium
   * @property 低保留权重 - Low
   * @default Medium
   */
  priority?: "Low" | "Medium" | "High";

  /**
   * Next.js SSR 服务端渲染上下文(req.context)
   * @default undefined
   */
  ctx?: CTX;
}

/**
 * @minisss/cookie 相关静态方法与属性
 */
interface IMSCookieStatic<MCD extends IMSCookieData, CTX> {
  /** 当前版本号 */
  VERSION: string;
  /**
   * 创建一个 @minisss/cookie 实例
   * @param config 配置
   * @return MSCookie 实例
   */
  create(config?: IMSCookieConfig<CTX>): Omit<IMSCookieStatic<MCD, CTX>, "create">;
  /**
   * cookie 获取
   * @param key 键
   * @param config 配置
   * @returns 对应键值
   */
  get<K extends keyof MCD>(key: K, config?: IMSCookieConfig<CTX>): MCD[K];
  /**
   * cookie 设置
   * @param key 键
   * @param val 值
   * @param config 配置
   * @returns boolean
   */
  set<K extends keyof MCD, V extends MCD[K]>(key: K, val: V, config?: IMSCookieConfig<CTX>): boolean;
  /**
   * cookie 删除
   * @param key 键
   * @param config 配置
   * @returns boolean
   */
  del<K extends keyof MCD>(key: K, config?: IMSCookieConfig<CTX>): boolean;
  /**
   * cookie 是否存在
   * @param key 键
   * @param config 配置
   * @returns boolean
   */
  has<K extends keyof MCD>(key: K, config?: IMSCookieConfig<CTX>): boolean;
  /**
   * cookie 序列化
   * @param key 键
   * @param val 值
   * @param config 配置
   * @returns string
   */
  serialize(key: string, val: any, config?: IMSCookieConfig<CTX>): string;
  /**
   * cookie 反序列化
   * @param cookieStr cookie字符串
   * @returns Object
   */
  parse<O extends MCD>(cookieStr: string): O;
}

/**
 * @minisss/cookie 自定义TS类型提示
 */
interface IMSCookieData {}
