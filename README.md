# @minisss/cookie

@minisss/cookie 库提供了一套统一且便捷的 Cookie API 接口，旨在简化 浏览器 与 Next.js 环境中 Cookie 的管理流程。

The @minisss/cookie library offers a unified and convenient Cookie API interface, designed to streamline the management of cookies in both browser and Next.js environments.

## 特性

- ✅ 支持 Nextjs SSR cookie 操作(传入 ctx 上下文即可)
- ✅ 内置 TS 类型提示, 重写 MSCookie 或 IMSCookieData 获得自定义 TS 类型提示
- ✅ 支持 ESM CJS UMD
- 🤡 支持广泛浏览器
- 😄 无依赖包

## 安装方式

```bash
# pnpm
pnpm i @minisss/cookie

# yarn
yarn add @minisss/cookie

# npm
npm i @minisss/cookie

# bun
bun install @minisss/cookie
```

## 使用方式

### ESM xxx.js

```js
import MSCookie from "@minisss/cookie";
MSCookie.set("cookieName", "cookieValue");
console.log(MSCookie.get("cookieName"));
```

### CJS xxx.js

```js
// CJS xxx.js
const MSCookie = require("@minisss/cookie");
MSCookie.set("cookieName", "cookieValue");
console.log(MSCookie.get("cookieName"));
```

### UMD xxx.html

```js
// UMD xxx.html 普通 script 直接导入 -> 访问全局变量 MSCookie
<script src="https://unpkg.com/@minisss/cookie@1.0.5"></script>;
<script>
  console.log("MSCookie 包对象: ", MSCookie)
  MSCookie.set('cookieName', 'cookieValue')
  console.log(MSCookie.get('cookieName'))
  console.log(MSCookie.has('cookieName'))
</script>

// script type module 模块化内部引入方式
<script type="module">
  import MSCookie from "https://unpkg.com/@minisss/cookie@1.0.5/out/index.esm.js";
  console.log("MSCookie 包对象: ", MSCookie)
  MSCookie.set('cookieName', 'cookieValue')
  console.log(MSCookie.get('cookieName'))
  console.log(MSCookie.has('cookieName'))
  console.log(MSCookie.del('cookieName'))
  console.log(MSCookie.has('cookieName'))
</script>
```

## API

| 方法名及属性 | 描述     | 参数                        | 返回值        |
| ------------ | -------- | --------------------------- | ------------- |
| create       | 创建实例 | create(config)              | 实例          |
| get          | 获取     | get(key, config)            | any           |
| set          | 设置     | set(key, config)            | boolean       |
| del          | 删除     | del(key, config)            | boolean       |
| has          | 是否存在 | has (key, config)           | boolean       |
| serialize    | 序列化   | serialize(key, val, config) | string        |
| parse        | 解析     | parse(cookieStr)            | IMSCookieData |
| VERSION      | 版本号   | MSCookie.VERSION            | string        |

## IMSCookieConfig

| 属性 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| domain | string | 可访问域名 | 当前文档域名 |
| path | string | 可访问路径 | 当前文档路径 |
| expires | Date | 过期时间 | 会话模式(浏览器关闭后清除所有会话 cookie) |
| maxAge | number | 最大存活时间(单位: s) maxAge 高于 expires | 会话模式(浏览器关闭后清除所有会话 cookie) |
| httpOnly | boolean | 阻止JS脚本获取该 cookie 值 <br>**_服务端设置有效<br>客户端设置无效_** | false |
| secure | boolean | 只允许 https 域名访问 | false |
| sameSite | "Strict", "Lax", "None" | 允许跨域发送的范围 <br>允许同源 - Strict <br>允许跨域 - Lax <br>允许所有 - None 需同时设置 secure 属性 | 浏览器自带默认值 |
| partitioned | boolean | 是否开启分区 | false |
| priority | "High", "Medium", "Low" | 当存储达上限时按权重由低到高清除 <br>高保留权重 - High <br> 中保留权重 - Medium <br> 低保留权重 - Low <br> | "Medium" |
| ctx | Nextjs.GetServerSidePropsContext | nextjs 服务端 cookie 获取及设置 | undefined |

## 覆写 IMSCookieData 获得自定义 TS 类型提示(可选)

```js
// 例如: 在 types/xxx.d.ts | global.d.ts 中定义 IMSCookieData 类型接口
interface IMSCookieData {
  name:string
  age:number
}
// 将 types/xxx.d.ts 加入到 tsconfig.json includes 中即可获得自定义类型提示功能
```
