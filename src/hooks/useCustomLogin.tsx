import { useRecoilState, useResetRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { Navigate, useNavigate, createSearchParams } from "react-router-dom"
import { AxiosError } from "axios";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUil";

const useCustomLogin = ( ) => {
const navigate = useNavigate();
const [loginState, setLoginState ] = useRecoilState(signinState);
const resetState = useResetRecoilState(signinState);
const isLogin = loginState.email ? true : false //----------로그인 여부

const doLogin = async (loginParam : {email: string, pw: string}) => { //----------로그인 함수
    const result = await loginPost(loginParam)
    console.log(result)
    saveAsCookie(result)
    return result
    }

const saveAsCookie = (data : any) => {
        setCookie("member",JSON.stringify(data), 1) //1일
        setLoginState(data)
        }

    const doLogout = () => { //---------------로그아웃 함수
            removeCookie('member') 
            resetState()
            }
            

    const moveToPath = (path : string) => { //----------------페이지 이동
    navigate({pathname: path}, {replace:true})
    }

    const moveToLogin = () => { //----------------------로그인 페이지로 이동
    navigate({pathname: '/member/login'}, {replace:true})
    }

    const moveToLoginReturn = () => { //--------로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login"/>
    }

    const exceptionHandle = (ex : AxiosError<{error: string}>) => {
        console.log("Exception-----------------------");
        console.log(ex);

        const errorMsg = ex.response?.data.error ?? "UNKNOWN ERROR" ;
        const errorStr = createSearchParams({error: errorMsg}).toString();

        if(errorMsg === 'REQUIRE_LOGIN'){
            alert("로그인 해야만 합니다.")
            navigate({pathname:'/member/login' , search: errorStr})
            return
            }
        if(ex.response?.data.error === 'ERROR_ACCESSDENIED'){
                alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
                navigate({pathname:'/member/login' , search: errorStr})
                return
                }
                
    }

    return {loginState, isLogin, doLogin, doLogout, saveAsCookie, moveToPath, moveToLogin, 
    moveToLoginReturn, exceptionHandle}
    }
    export default useCustomLogin