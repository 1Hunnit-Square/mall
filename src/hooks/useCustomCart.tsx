import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCartItems, postChangeCart } from "../api/cartApi"
import { useRecoilState } from "recoil"
import { cartState } from "../atoms/cartState"
import { useEffect } from "react";
const useCustomCart = () => {

    const [cartItems,setCartItems] = useRecoilState(cartState);
    const queryClient = useQueryClient();
    const changeMutation = useMutation({
      mutationFn : (param : {email : string, pno : string, qty: string, cino?: string}) => postChangeCart(param),
      onSuccess: (result) => { setCartItems(result)}});


    const query = useQuery({queryKey: ["cart"], queryFn: getCartItems, staleTime: 1000 * 60 * 60});


    useEffect(() => {
        if(query.isSuccess) {
        queryClient.invalidateQueries({queryKey:["cart"]});
        setCartItems(query.data)
        }
        },[query.isSuccess, query.data])
        

  const changeCart = (param : {email : string, pno : string, qty: string, cino?: string}) => {

    changeMutation.mutate(param);

  }

  return  {cartItems, changeCart}

}

export default useCustomCart
