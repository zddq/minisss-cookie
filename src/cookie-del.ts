import set from './cookie-set'

/**
 * cookie 设置
 * @param key 键
 * @param config 配置
 * @returns boolean
 */
export default function (key: any, config: IConfig = {}) {
  return set(key, "", { ...config, maxAge: -1 })
}
