import './App.css';
import { ProductListing } from "./Components/Product/ProductListing";
import { CartList } from "./Components/PrivatePage/Cart/CartList";
import { WishList } from "./Components/PrivatePage/WishList/WishList";
import { Address } from "./Components/PrivatePage/Address"
import { Login } from "./Components/Login/Login"
import NavBar from "./Components/NavBar/NavBar";
import { Register } from "./Components/Login/Register"
import {Routes, Route, Navigate} from "react-router-dom";
import { Modal } from "./Components/Modal";
import { CartModal } from "./Components/Modal"
import { WishListModal } from "./Components/Modal"

import { useAuth } from "./Contexter/AuthContext"
import { useProduct } from './Contexter/ProductContext';
import { useCartList } from './Contexter/CartContext';
import { useWishList } from './Contexter/WishListContext';

function App() {
  const { displayModal, modalContent } = useProduct();
  const { displayCartModal, cartModalContent } = useCartList();
  const { displayWishlistModal, wishlistModalContent } = useWishList();
  const { isUserLoggedIn } = useAuth();

  function PrivateRoute({ ...props }) {
    return isUserLoggedIn ? (
      <Route {...props} />
    ) : (
      <Navigate replace to="/login" />
    );
  }

  return (
    <div className="App">
      <NavBar />
      {displayModal && <Modal modalContent={modalContent} />}
      {displayCartModal && <CartModal cartModalContent={cartModalContent} />}
      {displayWishlistModal && <WishListModal wishlistModalContent={wishlistModalContent} />}
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/home" element={<ProductListing />} />
        <PrivateRoute path="/cartlist" element={<CartList />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
				<PrivateRoute path="/address" element={<Address />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
