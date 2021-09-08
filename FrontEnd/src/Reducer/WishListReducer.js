export const wishListReducer = (state, action) => {
    switch (action.type) {
      case "Loading":
        return {
          ...state,
          wishList:action.payload
        }

      case "Added":
        const AddedProduct = state.wishList.some(
          (item) => item.id === action.payload.id
        );
        if (AddedProduct) {
          return {
            ...state,
            wiishList: [...state.wishList],
            displayWishlistModal: true,
            wishlistModalContent: "Already exist in wishlist"
          };
        } else {
          return {
            ...state,
            wishList: action.payload,
            displayWishlistModal: true,
            wishlistModalContent: "Added to wishlist"
          };
        }
  
      case "AlreadyExist":
        return {
          ...state,
          displayCartModal: true,
          cartModalContent: "Item Already exist in cart"
        }
        
      case "Remove":
        state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: action.payload,
          displayWishlistModal: true,
          wishlistModalContent: "Removed from wishlist"
        };
  
      case "MoveToCart":
        const newWishListItem = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: newWishListItem,
          displayWishlistModal: true,
          wishlistModalContent: "Moved to cart"
        };

      case "ClearedWishlist":
        return {
          ...state,
          wishList:[],
          displayWishlistModal: true,
          wishlistModalContent: "Cleared wishlist"
        };

      case "DISPLAY_MODAL":
        //console.log("display modal called")
        return {
            ...state,
            displayWishlistModal: false,
        };

      default:
        return state
    }
  };
  