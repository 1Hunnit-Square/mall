type DataType =
{
    dtoList: any[],
    pageNumList: number[],
    pageRequestDTO: any,
    prev: boolean,
    next: boolean,
    totoalCount: number,
    prevPage: number,
    nextPage: number,
    totalPage: number,
    current: number
 }

const PageComponent = ({serverData, movePage} : {serverData: DataType, movePage: (...args : any[])=>void}) => {

    return (
    <div className="m-6 flex justify-center">
    {serverData.prev ?
    <div	className="m-2 p-2 w-16 text-center	font-bold text-blue-400 " onClick={() => movePage({page:serverData.prevPage} )}>
    Prev </div> : <></>}
    
    {serverData.pageNumList.map(pageNum =>
    <div key={pageNum}
    className={ `m-2 p-2 w-12	text-center rounded shadow-md text-white
    ${serverData.current === pageNum? 'bg-gray-500':'bg-blue-400'}`} onClick={() => movePage( {page:pageNum})}>
    {pageNum}
    </div>
    )}
    
    {serverData.next ?
    <div	className="m-2 p-2 w-16 text-center font-bold text-blue-400" onClick={() => movePage( {page:serverData.nextPage})}>
    Next
    </div> : <></>}
    </div>
    );
    }
    export default PageComponent;
    