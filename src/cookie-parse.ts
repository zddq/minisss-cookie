/**
 * cookie 解析
 * @param cookieStr cookie字符串
 * @returns {Object} Object
 */
export default function (cookieStr: string) {
  try {
    if (!cookieStr || typeof cookieStr !== "string") return {};

    const cookieItemArr = tryDecode(cookieStr).split(";").filter(Boolean);
    const cookieKVArr = cookieItemArr.map(kvStr => kvStr.split("="));
    return cookieKVArr.reduce((tmpObj: any, [key, ...valsArr]) => {
      const tmpKey = key.trim();
      const tmpVal = valsArr.map(it => it.trim()).join("=");
      try {
        return { ...tmpObj, [tmpKey]: JSON.parse(tmpVal) };
      } catch {
        return { ...tmpObj, [tmpKey]: tmpVal };
      }
    }, {});
  } catch (err) {
    console.error("cookie parse err:", err);
    return {};
  }
}

/**
 * 解码参数解码
 * @param str 待解码字符串
 * @returns 解码后的字符串
 */
function tryDecode(str: string) {
  try {
    return str.includes("%") ? decodeURIComponent(str) : str;
  } catch (error) {
    return str;
  }
}
