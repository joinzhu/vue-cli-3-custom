/**
 * index
 *
 * @Author
 * @DATE    create on
 * @DESC    工具类
 */

/**
 * 路由跳转
 */
export function go2Page(name, query) {
    this.$router.push({
        name,
        query,
    })
}

/**
 * json转params
 */
export function json2ParamsLocal(params){
    
    let url = ''
    for (let k in params) {
        let value = params[k] != undefined ? params[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}