import { ajax } from './createApi'
const { 
    get, 
    // del, 
    // put, 
    // post, 
} = ajax

/**
 * 
 */
export function fetchUserInfo() {
    return get('/me', undefined)
}