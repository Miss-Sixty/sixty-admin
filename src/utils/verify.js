//  验证是否为网址、邮箱、电话
export function isExternalLink(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}