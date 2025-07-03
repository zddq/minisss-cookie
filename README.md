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
| domain | string | 域名 | 默认当前文档域名 |
| path | string | 路径 | 默认当前文档路径 |
| expires | Date | 过期时间 | 默认会话模式 |
| maxAge | number(单位: s) | 最大存活时间(推荐) <br>maxAge 优先级高于 expires | 空 |
| httpOnly | boolean | 是否阻止客户端脚本访问该Cookie <br>**_只能在服务器端设置，不能在客户端设置_** | false |
| secure | boolean | 是否只允许 HTTPS 请求访问 | false |
| sameSite | "Strict", "Lax", "None" | 允许的跨域请求<br>Strict - 只允许同源的请求访问 <br>Lax - 允许跨域的请求访问 <br>None - 会在所有请求中发送，但需要同时设置Secure属性 | 空 |
| partitioned | boolean | 是否开启分区 | false |
| priority | "High", "Medium", "Low" | 浏览器保留优先级权重<br> High - 高保留 <br> Medium - 中等保留 <br> Low - 低保留 <br> 当Cookie达存储上限时低保留权重会被优先清除 | "Medium" |
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
