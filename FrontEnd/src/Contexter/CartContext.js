import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../Reducer/CartReducer";

export const CartContext = createContext();

const initialState = {
  cartList: [],
  displayCartModal: false,
  cartModalContent: "",
  loader: false
};

export function CartProvider({ children }) {
  const [state, dispatchCart] = useReducer(cartReducer, initialState);

  useEffect(() => {
    setTimeout(() => dispatchCart({ type: "DISPLAY_MODAL" }), 3000);
    return () => {
      clearTimeout();
    };
  }, [state.displayCartModal]);

  return (
    <CartContext.Provider value={{ ...state, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartList() {
  return useContext(CartContext);
}
