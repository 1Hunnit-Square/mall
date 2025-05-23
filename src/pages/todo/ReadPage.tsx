import { createSearchParams, useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
    const {tno} = useParams();
    const navigate = useNavigate();

    const [queryParams] = useSearchParams();

    const page = queryParams.get("page") ? parseInt(queryParams.get("page") as string) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size") as string) : 10;
    const queryStr = createSearchParams({page : page.toString() , size : size.toString()}).toString()


    const moveToModify = useCallback((tno : string | undefined) => {
       tno && navigate({pathname: `/todo/modify/${tno}`, search: queryStr})
    },[tno, page, size]);

    const moveToList = useCallback(()=> {
        navigate({pathname: `/todo/list`, search: queryStr})}, [page, size]);
    

    return (
        <div className="font-extrabold w-full bg-white mt-6">
        <div className="text-2xl "> Todo Read Page Component {tno} </div>
        {tno && <ReadComponent tno={tno}></ReadComponent>}
        </div>
    );
    
    }
    
    export default ReadPage;
    