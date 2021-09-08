export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    
    case "SHOW_LOADER":
      return {
        ...state,
        loader: !state.loader,
      };
    
    case "Added_to_cart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        displayModal: true,
        modalContent: "Added to cart"
      };

    case "Remove from cart":
      const newArr = state.cart.filter((item) => item._id !== action.payload);
      return {
        ...state,
        cart: newArr,
        displayModal: true,
        modalContent: "Removed from cart"
      };
    
    case "INCREASE_QUANTITY":
      const increasedQuantity = state.cart.map((item) => {
        return item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      return {
        ...state,
        cart: increasedQuantity,
        displayModal: true,
        modalContent: "Increased quantity"
      };
    
    case "DECREASE_QUANTITY":
      const decreasedQuantity = state.cart.map((item) => {
        return item._id === action.payload
          ? {
              ...item,
              quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
            }
          : item;
      });
      return {
        ...state,
        cart: decreasedQuantity,
        displayModal: true,
        modalContent: "Decreased quantity"
      };
    
    case "Added to wish":
      return {
        ...state,
        wishItems: [...state.wishItems, action.payload],
        displayModal: true,
        modalContent: "Added to Wishlist"
      };

    case "Remove from wish":
      const newObj = state.wishList.filter(
        (items) => items._id !== action.payload
      );
      return {
        ...state,
        wishList: newObj,
        displayModal: true,
        modalContent: "Removed from Wishlist"
      };
    
    case "MOVE_TO_CART":
      if (
        state.cart.some((items) => items.id === action.payload.id) === false
      ) {
        const newObj = state.wishList.filter(
          (items) => items.id !== action.payload.id
        );
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
          wishList: newObj,
          displayModal: true,
          modalContent: "Added to cart",
        };
      }
      return {
        ...state,
        displayModal: true,
        modalContent: "Already in cart",
      };
    
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    
    case "CLEAR_WISHLIST":
      return {
        ...state,
        wishList: [],
      };
    
    case "DISPLAY_MODAL":
      //console.log("display modal called")
      return {
          ...state,
          displayModal: false,
      };

    case "Registered":
      return{
        displayModal: true,
        modalContent: "Registered successfully"
      }

    case "LoggedIN":
      return{
        displayModal: true,
        modalContent: "Logged IN successfully"
      }

    case "LoggedOut":
      return{
        displayModal: true,
        modalContent: "Logged out successfully"
      }

    default:
      return state;
  }
};