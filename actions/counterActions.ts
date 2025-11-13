import { DECREMENT, INCREMENT, RESET } from "../constants/actionTypes";

export const increment = ()=>({type:INCREMENT})
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });