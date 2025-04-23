import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product : FormData) => {


const header = {
    headers: {"Content-Type": "multipart/form-data"}
}

// 경로 뒤 '/' 주의
const res = await axios.post(`${host}/`, product, header);

return res.data

}

export const getList = async (pageParam : {page: string, size: string}) => {
    const {page, size} = pageParam;

    const res = await axios.get(`${host}/list`, {params : {page:page, size: size}})

    return res.data;
}

export const getOne = async (pno : string) => {
    const res = await axios.get(`${host}/${pno}`);

    return res.data;
}

export const putOne = async (pno: string, product : FormData) => {
    const header = {headers: {"Content-Type":"multipart/form-data"}};
    const res = await axios.put(`${host}/${pno}`, product, header)

    return res.data;
}

export const deleteOne = async (pno : string) => {
    const res = await axios.delete(`${host}/${pno}`);
    return res.data;

}
