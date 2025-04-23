import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";

const getNum = (param : string | null, defaultValue : number) => { 
    if(!param){
return defaultValue
}
return parseInt(param)
}


const useCustomMove = () => { 

const navigate = useNavigate();
const [refresh, setRefresh] = useState(false);
const [queryParams] = useSearchParams();

const page = getNum(queryParams.get('page'),1).toString();
const size = getNum(queryParams.get('size'),10).toString();
const queryDefault = createSearchParams({page : page, size: size}).toString(); //새로 추가

const moveToList = (pageParam : {page: number, size: (number | null)} | null) => {
    
    let queryStr = ""

    if(pageParam){
    
    const pageNum = getNum(pageParam.page.toString(), 1);
    const sizeNum = getNum(pageParam.size == null ? null : pageParam.size.toString(), 10);
    queryStr = createSearchParams({page:pageNum.toString(), size: sizeNum.toString()}).toString();

    } else {

    queryStr = queryDefault;

    }
    
    navigate({
     pathname: `../list`,
     search: queryStr
      });
    setRefresh(!refresh);
    
    }

    const moveToModify = useCallback((num : string) => {
        console.log(queryDefault)
        navigate({ pathname: `../modify/${num}`, search: queryDefault })
        },[]);

    const moveToRead = (num : string) =>{
        console.log(queryDefault);
        navigate({
            pathname:
            `../read/${num}`, search: queryDefault
        })
    };
        

    return	{ moveToList, moveToModify, moveToRead, page, size, refresh}
    }
    
    export default useCustomMove
    
