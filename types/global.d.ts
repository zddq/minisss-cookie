/**
 * mini-cookie 设置可配置参数
 */
interface IConfig<CTX extends any = any> {
  /**
   * 域
   * @description 指定了哪些域可以接收该Cookie
   * @description 你可以控制Cookie的可见性和发送范围，从而增强应用的安全性和隐私性。
   * @default 默认为当前文档路径域部分
   */
  domain?: string;
  /**
   * 路径
   * @description 指定Cookie应该被发送到服务器的URL路径。
   * @description 你可以控制哪些页面可以访问特定的Cookie，从而增加Cookie的访问控制和安全性
   * @default 默认为当前文档位置的路径
   */
  path?: string;
  /**
   * cookie过期时间
   * @description 指定Cookie的过期时间。一旦到达这个时间，Cookie将被浏览器自动删除，不再存储在用户的设备上。
   * @default 未设置则会在对话结束时过期
   */
  expires?: Date;
  /**
   * cookie 过期秒数, MaxAge 优先级高于 Expires。(推荐)
   * @description 指定 Cookie 从创建或最后一次更新开始，应该存活的秒数。一旦达到这个时间长度，Cookie将被浏览器自动删除。
   */
  maxAge?: number;
  /**
   * 是否阻止客户端脚本（如JavaScript）访问该Cookie
   * @description 当Cookie设置了HttpOnly属性后，不能通过JavaScript的document.cookie属性访问，这有助于减少跨站脚本攻击（XSS）的风险。
   * @description 只能在服务器端设置，不能在客户端设置。
   * @default false
   */
  httpOnly?: boolean;
  /**
   * 是否通过 https 发送 cookie
   * @description 当Cookie设置了Secure属性后，该Cookie只能通过HTTPS协议传输，不能通过HTTP传输。这有助于确保Cookie在传输过程中加密，增加安全性。
   * @default false
   */
  secure?: boolean;
  /**
   * 跨站请求行为
   * @description 控制Cookie在跨站请求时的行为，目的是防止跨站请求伪造（CSRF）攻击。通过设置SameSite属性，你可以指定Cookie是否应该在跨站请求中被发送。
   * @property Strict - Cookie不会在跨站请求中发送
   * @property Lax - Cookie在跨站请求中只会在某些条件下发送
   * @property None - Cookie会在所有请求中发送，但需要同时设置Secure属性
   */
  sameSite?: "Strict" | "Lax" | "None";
  /**
   * 是否具有独立分区状态的 Cookie (CHIPS) - 更精细的第三方 cookie 跟踪
   * @description 具有独立分区状态的 Cookie（Cookies Having Independent Partitioned State，CHIPS），也称之为分区 Cookie（Partitioned cookie），允许开发人员选择将 cookie 放入分区存储中，每个顶级站点都有一个单独的 cookie 存储空间。
   */
  partitioned?: boolean;
  /**
   * Cookie指定保留优先级权重, 这有助于浏览器决定在存储空间有限时哪些Cookie应该被保留
   * @description Cookie的优先级，可以是Low、Medium（默认）或High。设置优先级有助于浏览器决定在存储空间有限时哪些Cookie应该被保留或删除。
   * @default Medium
   */
  priority?: "Low" | "Medium" | "High";

  /** SSR nextjs 服务端渲染上下文 */
  ctx?: CTX;
}

/**
 * mini方法与属性
 */
interface IStatic<MCD extends IMiniCookieData, CTX> {
  /**
   * 创建一个 MiniCookie 实例
   * @param config 配置
   * @return MiniCookie 实例
   */
  create(config?: IConfig<CTX>): Omit<IStatic<MCD, CTX>, "create">
  /**
   * cookie 获取
   * @param key 键
   * @param config 配置
   * @returns 对应键值
   */
  get<K extends keyof MCD>(key: K, config?: IConfig<CTX>): MCD[K]
  /**
   * cookie 设置
   * @param key 键
   * @param val 值
   * @param config 配置
   * @returns boolean
   */
  set<K extends keyof MCD, V extends MCD[K]>(key: K, val: V, config?: IConfig<CTX>): boolean
  /**
   * cookie 删除
   * @param key 键
   * @param config 配置
   * @returns boolean
   */
  del<K extends keyof MCD>(key: K, config?: IConfig<CTX>): boolean
  /**
   * cookie 是否存在
   * @param key 键
   * @param config 配置
   * @returns boolean
   */
  has<K extends keyof MCD>(key: K, config?: IConfig<CTX>): boolean
  /**
   * cookie 序列化
   * @param key 键
   * @param val 值
   * @param config 配置
   * @returns string
   */
  serialize(key: string, val: any, config?: IConfig<CTX>): string
  /**
   * cookie 反序列化
   * @param cookieStr cookie字符串
   * @returns Object
   */
  parse<O extends MCD>(cookieStr: string): O
  /**
   * 当前版本号
   */
  VERSION: string
}


/**
 * cookie 数据类型
 */
interface IMiniCookieData { }
