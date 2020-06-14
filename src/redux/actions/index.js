export const userSession = (status) => {
    switch (status) {
        case 'login':
            return {type : 'LOGIN'}
        case 'logout':
            return {type : 'LOGOUT'}
        default:
            break;
    }
}