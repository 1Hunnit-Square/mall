import axios from "axios";
import jwtAxios from "../util/jwtUtil";

interface TodoType {
title: string;
writer: string;
dueDate: string;
}

export const API_SERVER_HOST = 'http://localhost:8090';
const prefix = `${API_SERVER_HOST}/api/todo`;

export const getOne = async(tno : string) => {
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data;
}

export const getList = async (pageParam : { page: string, size: string})=> {
    const { page, size } = pageParam;

    const res = await jwtAxios.get(`${prefix}/list`, {params : {page:page, size: size}});
    return res.data;
}

export const postAdd = async (todoObj : TodoType) => {
    const res = await jwtAxios.post(`${prefix}/`, todoObj)

    return res.data;
}

export const deleteOne = async (tno : string) => {
    const res = await jwtAxios.delete(`${prefix}/${tno}`)
    return res.data;
}

export const putOne = async(todo : TodoType & {tno : number}) => {
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`,todo);
    return res.data;
}