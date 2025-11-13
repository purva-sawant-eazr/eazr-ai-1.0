import { SET_USER } from "../constants/actionTypes";

export const setUser = (user: any) => ({
    type: SET_USER,
    payload: user,
});