const tokenKey = 'token'

// 处理token方法 
let TokenCache = {
    getToken() {
        return localStorage.getItem(tokenKey)
    },
    setToken(newToken) {
        localStorage.setItem(tokenKey, newToken)
    },
    deleteToken() {
        localStorage.removeItem(tokenKey)
    }
}

export default TokenCache