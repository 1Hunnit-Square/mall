import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi"
import axios from "axios";

const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam : {email : string, pw : string}) => {
    const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}
    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)
    const res = await axios.post(`${host}/login`, form, header)
    return res.data
}

export const modifyMember = async (member : {email : string, pw : string, nickname: string}) => {
    const res = await jwtAxios.put(`${host}/modify`, member)
    return res.data
    }