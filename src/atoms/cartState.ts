import { atom, selector } from "recoil";
export const cartState = atom({
    key:'cartState',
    default:[{price: 0, qty:0}]
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