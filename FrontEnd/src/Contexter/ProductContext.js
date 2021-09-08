import { createContext, useContext } from "react";
import { useReducer, useEffect } from "react";
import {productReducer} from "../Reducer/productReducer"

export const ProductContext = createContext();

const initialState = {
  products: [],
  cartItems: [],
  wishItems: [],
  displayModal: false,
  modalContent: "",
  loader: false
};

export function ProductProvider({ children }) {
  const [state, dispatchProduct] = useReducer(productReducer, initialState);

  useEffect(() => {
    setTimeout(() => dispatchProduct({ type: "DISPLAY_MODAL" }), 3000);
    return () => {
      clearTimeout();
    };
  }, [state.displayModal]);

  return (
    <ProductContext.Provider value={{ ...state, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}