import Cookies from 'js-cookie';

export const isLogin = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN':
            return true
        case 'LOGOUT':
            Cookies.remove('access_jwt', { path: '/', domain: process.env.REACT_APP_COOKIES_DOMAIN })
            Cookies.remove('refresh_jwt', { path: '/', domain: process.env.REACT_APP_COOKIES_DOMAIN })
            Cookies.remove('client', { path: '/', domain: process.env.REACT_APP_COOKIES_DOMAIN })
            return false
        default:
            return state;
    }
}