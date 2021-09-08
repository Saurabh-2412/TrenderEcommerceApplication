import { createContext, useContext, useReducer, useEffect } from "react";
import { wishListReducer } from "../Reducer/WishListReducer";

export const WishListContext = createContext();

const initialState = {
  wishList: [],
  displayWishlistModal: false,
  wishlistModalContent: "",
  loader: false,
};

export function WishListProvider({ children }) {
  const [state, dispatchWishList] = useReducer(wishListReducer, initialState);

  useEffect(() => {
    setTimeout(() => dispatchWishList({ type: "DISPLAY_MODAL" }), 3000);
    return () => {
      clearTimeout();
    };
  },[state.displayWishlistModal]);

  return (
    <WishListContext.Provider value={{ ...state, dispatchWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  return useContext(WishListContext);
}
