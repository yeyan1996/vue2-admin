import Cookies from "js-cookie";

const TokenKey = "token";

export const getToken = () => Cookies.get(TokenKey);
export const setToken = () => Cookies.set("token", TokenKey);
export const removeToken = () => Cookies.remove(TokenKey);
