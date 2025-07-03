# @minisss/cookie

@minisss/cookie 是一个轻量级的 JavaScript 库，旨在简化对浏览器 Document.cookie 的操作。它提供了一组简单易用的 API，允许开发者轻松地读取、设置和删除 cookie，而无需直接处理复杂的字符串操作。

## 特性

- ✅ 支持 Nextjs SSR cookie 操作(传入 ctx 上下文即可)
- ✅ 内置 TS 类型提示, 重写 IMiniCookieData 获得自定义 TS 类型提示
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
import MiniCookie from "@minisss/cookie";
MiniCookie.set("cookieName", "cookieValue");
console.log(MiniCookie.get("cookieName"));
```

### CJS xxx.js

```js
// CJS xxx.js
const MiniCookie = require("@minisss/cookie");
MiniCookie.set("cookieName", "cookieValue");
console.log(MiniCookie.get("cookieName"));
```

### UMD xxx.html

```js
// UMD xxx.html 普通 script 直接导入 -> 访问全局变量 MiniCookie
<script src="https://unpkg.com/@minisss/cookie@0.0.1-alpha.2"></script>;
<script>
  console.log("MiniCookie 包对象: ", MiniCookie)
  MiniCookie.set('cookieName', 'cookieValue')
  console.log(MiniCookie.get('cookieName'))
  console.log(MiniCookie.has('cookieName'))
</script>

// script type module 模块化内部引入方式
<script type="module">
  import MiniCookie from "https://unpkg.com/@minisss/cookie@0.0.1-alpha.2/dist/index.esm.js";
  console.log("MiniCookie 包对象: ", MiniCookie)
  MiniCookie.set('cookieName', 'cookieValue')
  console.log(MiniCookie.get('cookieName'))
  console.log(MiniCookie.has('cookieName'))
  console.log(MiniCookie.del('cookieName'))
  console.log(MiniCookie.has('cookieName'))
</script>
```

## API

| 方法名    | 描述             | 参数                        | 返回值          |
| --------- | ---------------- | --------------------------- | --------------- |
| create    | 创建 cookie 实例 | create(config)              | 实例            |
| get       | 获取             | get(key, config)            | any             |
| set       | 设置             | set(key, config)            | boolean         |
| del       | 删除             | del(key, config)            | boolean         |
| has       | 判断是否存在     | has (key, config)           | boolean         |
| serialize | 序列化           | serialize(key, val, config) | string          |
| parse     | 解析             | parse(cookieStr)            | IMiniCookieData |
| version   | 版本号           | MC.version                  | string          |

## Config

| 属性 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| domain | string | 域名 | 默认当前文档路径域部分 |
| path | string | 路径 | 默认当前文档位置的路径 |
| expires | Date | 过期时间 | 未设置则会在对话结束时过期 |
| maxAge | number(单位: s) | 最大存活时间(推荐) <br>MaxAge 优先级高于 Expires | 空 |
| httpOnly | boolean | 是否阻止客户端脚本访问该Cookie <br>**_只能在服务器端设置，不能在客户端设置_** | false |
| secure | boolean | 是否只允许 HTTPS 请求访问 | false |
| sameSite | "Strict", "Lax", "None" | 允许的跨域请求<br>Strict - 只允许同源的请求访问 <br>Lax - 允许跨域的请求访问 <br>None - 会在所有请求中发送，但需要同时设置Secure属性 | 空 |
| partitioned | boolean | 是否开启分区 | false |
| priority | "High", "Medium", "Low" | 浏览器保留优先级权重<br> High - 高保留 <br> Medium - 中等保留 <br> Low - 低保留 <br> 当Cookie达存储上限时低保留权重会被优先清除 | "Medium" |
| ctx | Nextjs.GetServerSidePropsContext | nextjs 服务端 cookie 获取及设置 | undefined |

## 覆写 IMiniCookieData 获得自定义 TS 类型提示(可选)

```js
// 覆写 IMiniCookieData 类型接口已获得类型提示
// 例如: 在 type/xxx.d.ts | global.d.ts 中定义 IMiniCookieData 类型接口
declare namespace MiniCookie {
  interface IMiniCookieData {
    name:string
    age:number
  }
}
// 将 types/xxx.d.ts 加入到 tsconfig.json includes 中即可获得自定义类型提示功能咯

```
