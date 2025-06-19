export const logout = () =>{
    document.cookie = 'token=;Max-Age=0'
    window.location.href= '/login'
} 