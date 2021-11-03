// 提供首页相关的api函数
import request from "@/utils/request";
/**
 * 获取品牌
 * @param {Integer} limit 品牌个数
 * @returns promise
 */
export function findBrand(limit = 6) {
    return request("/home/brand", "get", { limit });
}

export function findBanner() {
    return request("/home/banner", "get");
}
