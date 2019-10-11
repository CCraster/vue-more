import Cookies from 'js-cookie';

export default {
    setAttribute(key, value, expiresTime) {
        if (expiresTime) {
            return Cookies.set(key, value, { expires: expiresTime });
        }
        return Cookies.set(key, value);
    },
    getAttribute(key) {
        return Cookies.get(key);
    },
    remove(key) {
        return Cookies.remove(key);
    }
};
