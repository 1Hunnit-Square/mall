import { useEffect, useState } from "react";
import	{getOne} from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart"
import useCustomLogin from "../../hooks/useCustomLogin"
import { useQuery } from "@tanstack/react-query";


const initState = { pno:0, pname: '', pdesc: '', price: 0,	uploadFileNames:[] as string[] }
const host = API_SERVER_HOST;

const ReadComponent = ({pno} : {pno : string}) => {

//화면 이동용 함수
const {moveToList, moveToModify} = useCustomMove()
//fetching
const { isFetching, data} = useQuery<typeof initState>({
    queryKey: ['products',pno],
    queryFn: ()=> getOne(pno),
    staleTime: 1000 * 10,
    retry: 1}
);

const {changeCart, cartItems} = useCustomCart();

const {loginState} = useCustomLogin();


const handleClickAddCart = () => {
        let qty = 1
        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0]
        if(addedItem) {
        if(window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false){
        return
        }
        qty = addedItem.qty + 1
        }
        changeCart({email: loginState.email as string, pno:pno.toString(), qty:qty.toString()})
        }
        
const product = data || initState;

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
        {isFetching? <FetchingModal/> :<></>}

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pno}</div>
                </div>
            </div>
        
    
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pname}</div>
            </div>
        </div>
    
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.price}</div>
            </div>
        </div>

        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pdesc}</div>
            </div>
        </div>

        <div className="w-full justify-center flex	flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => <img alt ="product" key={i} className="p-4 w-1/2" src={`${host}/api/products/view/${imgFile}`}/>)}
        </div>
        <div className="flex justify-end p-4">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
        onClick={handleClickAddCart} > Add Cart </button>
        <button type="button" onClick={() => moveToModify(pno)}
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
        > Modify </button>
        <button type="button" onClick={()=>moveToList(null)}
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500">
        List
        </button>
        </div>
        </div>
    );
}

export default ReadComponent
    