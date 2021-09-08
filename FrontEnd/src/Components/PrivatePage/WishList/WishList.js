import React, {useEffect} from "react";
import axios from "axios"
import { useWishList } from "../../../Contexter/WishListContext";
import { useCartList } from "../../../Contexter/CartContext";
import { NavLink }  from "react-router-dom";

export function WishListHeader() {
  const { wishList } = useWishList();
  return (
    <span style={{ float: "right", display: "block" }}>{wishList.length}</span>
  );
}

export function WishList() {
  const { wishList, dispatchWishList } = useWishList();
  const { cartList, dispatchCart } = useCartList();
  const  { token } = JSON.parse(localStorage?.getItem("login")) || {};

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://ecommercedata.saurabhsharma11.repl.co/v1/wishlistData"
      );
      //const filteredData = data.WishlistProduct.filter((wishItem) => wishItem.userID === id)
      //dispatchWishList({ type: "Loading", payload: data.WishlistProduct })
      dispatchWishList({ type: "Loading", payload: data.WishlistProduct })
    })();
  },[dispatchWishList]);

  async function WishListHandler(product){
    if(!cartList.some((item) => item.id === product.id)){
      try {
        const {data} = await axios.post(
          "https://ecommercedata.saurabhsharma11.repl.co/v1/cartData",
          { product }
        );
        dispatchCart({ type: "Added", payload: data.cart});
      } catch (err) {
        console.log(err);
      }

      try{
        const productId = product._id;
        const { data } = await axios.delete("https://ecommercedata.saurabhsharma11.repl.co/v1/wishlistData",
        { data:{"productId":productId}});
        dispatchWishList({ type: "Remove", payload: data.wishProduct })
      }
      catch(err){
        console.log(err);
      }

    } else {
      const productId = product.id;
      const quantity = product.quantity + 1;
      try{
        const { data } = await axios.post("https://ecommercedata.saurabhsharma11.repl.co/v1/cartData/cartUpdate",
        { "productId":productId, "quantity":quantity })
        dispatchCart({ type: "Increment", payload: data.cartItem });
      }
      catch(err){
        console.log(err);
      }

      try{
        const productId = product._id;
        const { data } = await axios.delete("https://ecommercedata.saurabhsharma11.repl.co/v1/wishlistData",
        { data:{"productId":productId}});
        dispatchWishList({ type: "Remove", payload: data.wishProduct })
      }
      catch(err){
        console.log(err);
      }
    }
  }

  async function Remove(product){
    try{
      const productId = product._id;
      const { data } = await axios.delete("https://ecommercedata.saurabhsharma11.repl.co/v1/wishlistData",
      { data:{"productId":productId}});
      //console.log("deleted prod", data.wishProduct);
      dispatchWishList({ type: "Remove", payload: data.wishProduct })
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <ul className="CartList">
      <h1 style={{color:"orange",border:"2px solid gray",borderRadius:"5px"}}>Your wishlist collection</h1>
        {wishList.length > 0 ? (
          wishList.map((product) => (
            <li key={product.id}>
              <div key={product.id} className="card horizontal">
                <img src={product.image} alt={product.image} />
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <div className="card-text">
                      <p>Price : {product.price}</p>
                      <p>IdealFor : {product.idealFor}</p>
                      <p>Color : {product.color}</p>
                      <p>Offer : {product.offer}</p>
                      <p>Material : {product.material}</p>
                      <p>Brand : {product.brand}</p>
                      <p>Ratings : {product.ratings}</p>
                      <button className="btn btn-secondary btn-sm" onClick={() => Remove(product)}>Remove</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => WishListHandler(product)}>Move to cart</button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>
            <p style={{color:"orange",fontWeight:"bolder",fontSize:"1.8rem",marginTop:"10rem"}}>No items available in WishList</p>
            <NavLink className="NavLink" to="../" style={{textDecoration:"none"}}>
                <span style={{}}>Shop Now</span>
            </NavLink>
          </div>
        )}
      </ul>
    </>
  );
}
