import { fetchUser } from "../utils/fetchLocalStorageData";
import { fetchCart } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  food: null,
  cartShow: false,
  cartItem: cartInfo,
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_FOOD":
      return {
        ...state,
        food: action.food,
      };
    case "SET_CART_SHOW":
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItem: action.cartItem,
      };
    default:
      return state;
  }
};
