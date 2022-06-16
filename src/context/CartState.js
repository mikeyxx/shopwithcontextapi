import { useReducer } from "react";
import context from "./Context";
import { products } from "../data";
import { cartReducer } from "./Reducers";
import { productReducer } from "./Reducers";

function CartState({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <context.Provider
      value={{ state, dispatch, productState, productDispatch }}
    >
      {children}
    </context.Provider>
  );
}

export default CartState;
