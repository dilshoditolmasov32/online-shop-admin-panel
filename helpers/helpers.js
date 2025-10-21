import Cookies from "js-cookie";

export const saveAccessToken=(auth_token)=>{
    Cookies.set("auth_token", auth_token)
}

export const getAccessToken=()=>{
    Cookies.get("auth_token")
}