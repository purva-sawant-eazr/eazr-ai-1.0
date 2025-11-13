import { DECREMENT, INCREMENT, RESET } from "../constants/actionTypes";

const initialState = { count: 0 };

export default function counterReducer(state = initialState, action:any) {
    switch (action.type) {
      case INCREMENT:
        return { ...state, count: state.count + 1 };

      case DECREMENT:
        return { ...state, count: state.count - 1 };

      case RESET:
            return { ...state, count: 0 };
        default:
            return state;
    }
}