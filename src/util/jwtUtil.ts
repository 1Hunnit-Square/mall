import axios, {InternalAxiosRequestConfig, AxiosError, AxiosResponse} from "axios";
import { getCookie, setCookie } from "./cookieUil";
import { API_SERVER_HOST } from "../api/todoApi";

const host = `${API_SERVER_HOST}/api/member`

const refreshJWT = async (accessToken : string, refreshToken: string) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
             "Content-Type": "application/x-www-form-urlencoded",
        }
    };
    const params = new URLSearchParams();
    params.append("refreshToken", refreshToken);
    
    const res = await axios.post(
        `${host}/refresh`, 
        params, 
        header
    );
    
    return res.data;
};

const jwtAxios = axios.create();

//before request
const beforeReq = (config : InternalAxiosRequestConfig) => {
    console.log("before request.............");
    const memberInfo = getCookie("member");

    if( !memberInfo ) {
    console.log("Member NOT FOUND")
    return Promise.reject(
    {
        response:
        {data:
            {error:"REQUIRE_LOGIN"}
        }
    }
    );
    }

    const {accessToken} = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`;

return config;
}

//fail request
const requestFail = (err : AxiosError) => {
    console.log("request error............")
return Promise.reject(err)
}
//before return response
const beforeRes = async (res : AxiosResponse) => {
    console.log("before return response...........");
    console.log(res);
    const data = res.data;

    if(data && data.error ==='ERROR_ACCESS_TOKEN'){
        const memberCookieValue = getCookie("member")
        const result = await refreshJWT( memberCookieValue.accessToken, memberCookieValue.refreshToken );
        console.log("refreshJWT RESULT", result)
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken
        setCookie("member", JSON.stringify(memberCookieValue), 1);

        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest);
        }
        return res
}
//fail response
const responseFail = (err : AxiosError) => {
    console.log("response fail error.............")
return Promise.reject(err);
}
jwtAxios.interceptors.request.use( beforeReq, requestFail )
jwtAxios.interceptors.response.use( beforeRes, responseFail)
export default jwtAxios;