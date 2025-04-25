import { atom, selector } from "recoil";
export const cartState = atom({
    key:'cartState',
    default:[{
        cino: 0,
        pname: "",
        price: 0,
        pno: 0,
        qty: 0,
        imageFile: [] as string[]
    }]
})

export const cartTotalState = selector( {
    key: "cartTotalState",
    get: ( {get} ) => {
    const arr = get(cartState)
    const initialValue = 0
    const total = arr.reduce((total , current) => total + current.price *
    current.qty , initialValue)
    return total
    }
    })