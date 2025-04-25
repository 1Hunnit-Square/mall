import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



const initState = {
    pno:0,
    pname: '',
    pdesc: '',
    price: 0,
    delFlag:false,
    uploadFileNames:[] as string[]
    }
    
const host = API_SERVER_HOST;

const ModifyComponent = ({pno}: {pno : string}) => {
    const {moveToRead, moveToList} = useCustomMove()
    const [product, setProduct] = useState(initState)
    const uploadRef = useRef<HTMLInputElement | null>(null);

    const query = useQuery({queryKey : ['products', pno], queryFn:() => getOne(pno), staleTime: Infinity});

    

    useEffect(() => { 
        if(query.isSuccess) {
            setProduct(query.data)
            }
        
        } ,[pno, query.data, query.isSuccess])

        const delMutation = useMutation({mutationFn : (pno : string) => deleteOne(pno)})
        const queryClient = useQueryClient();

       
    
    const handleChangeProduct = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        if(e.target.name === "pname" || e.target.name === "pdesc")
            product[e.target.name] = e.target.value;

        if(e.target.name === "price")
            product[e.target.name] = parseInt(e.target.value);

        if(e.target.name === "delFlag")
            product[e.target.name] = e.target.value === "true"? true: false;


        setProduct({...product});
    }

    const deleteOldImages = (imageName : string) => {
        const resultFileNames = product.uploadFileNames.filter(fileName => fileName !== imageName);
        product.uploadFileNames = resultFileNames;
        
        setProduct({...product})
        
        }
    
    const modMutation = useMutation({mutationFn :(product : FormData) => putOne(pno, product)});
    const handleClickModify = () => {
        const files = uploadRef.current?.files;
        const formData = new FormData();
        if(files){
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }
            //other data
            formData.append("pname", product.pname);
            formData.append("pdesc", product.pdesc);
            formData.append("price", product.price.toString());
            formData.append("delFlag", product.delFlag.toString());

            for( let i = 0; i < product.uploadFileNames.length ; i++){ 
                formData.append("uploadFileNames", product.uploadFileNames[i]);
            }
            modMutation.mutate(formData)
            }

            const handleClickDelete = () => {
                delMutation.mutate(pno)
                } 
                

            const closeModal = () => { 
                if(delMutation.isSuccess) {
                    queryClient.invalidateQueries({queryKey : ['products', pno]});
                    queryClient.invalidateQueries({queryKey : ['products/list']});
                    moveToList(null);
                    
                }

                if(modMutation.isSuccess) {
                    queryClient.invalidateQueries({queryKey : ['products', pno]})
                    queryClient.invalidateQueries({queryKey : ['products/list']})
                    moveToRead(pno)
                    }
            }
                
            

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
        {query.isFetching || delMutation.isPending || modMutation.isPending ? 
        <FetchingModal/> :
        <></>
        }
        { delMutation.isSuccess || modMutation.isSuccess ?
        <ResultModal
        title={'처리 완료'}
        content={'정상적으로 처리되었습니다.'}	//결과 모달창
        callbackFn={closeModal} />
        :
        <></>
        }

        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct} ></input>
        </div>
        </div>
        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Desc</div>
        <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y" name="pdesc" rows={4} onChange={handleChangeProduct} value={product.pdesc}> {product.pdesc} </textarea>
        </div>
        </div>
        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Price</div>
        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
        </div>
        </div>
        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
        <select name="delFlag" value={product.delFlag.toString()} onChange={handleChangeProduct}
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
        <option value="false">사용</option>
        <option value="true">삭제</option>
        </select>
        </div>
        </div>
        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Files</div>
        <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" type={'file'} multiple={true}></input>
        </div>
        </div>
        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Images</div>
        <div className="w-4/5 justify-center flex flex-wrap items-start">
        {product.uploadFileNames.map( (imgFile, i) =>
        <div className="flex justify-center flex-col w-1/3 m-1 align-baseline" key = {i}>
        <button className="bg-blue-500 text-3xl text-white" onClick={() => deleteOldImages(imgFile)}>DELETE</button>
        <img alt ="img" src={`${host}/api/products/view/s_${imgFile}`}/>
        </div>
        )}
        </div>
        </div>
        </div>
        <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={handleClickDelete}>
        Delete
        </button>
        <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500" onClick={handleClickModify}>
        Modify </button>
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={()=>moveToList(null)}> List
        </button>
        </div>

    </div>
    );
    }
    
    export default ModifyComponent;