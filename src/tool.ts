/**
 * 解码参数解码
 * @param str 待解码字符串
 * @returns 解码后的字符串
 */
export function tryDecode(str: string) {
  try {
    return str.includes("%") ? decodeURIComponent(str) : str;
  } catch (error) {
    return str;
  }
}
