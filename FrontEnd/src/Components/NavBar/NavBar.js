import { NavLink }  from "react-router-dom";
import React,{useState} from "react";
import { CartHeader } from "../PrivatePage/Cart/CartList";
import { WishListHeader } from "../PrivatePage/WishList/WishList";

function NavBar() {

  const [winWidth, setWinWidth] = useState("0%");

  function toggleNav() {
    if (winWidth === "0%") {
    setWinWidth("100%");
    } else {
    setWinWidth("0%");
    }
  }

  return (
    <div>
        <nav>
            <div style={{ width: winWidth }} className="overlay">
              <button className="closebtn" onClick={toggleNav}></button>
              <div className="overlay-content">
                <p style={{backgroundColor:"none", color:"orange",fontSize:"3rem"}}><i className="material-icons" style={{fontSize:"3rem"}}>&#xe8e5;</i>TrenderCommerce</p>
                <NavLink to="/" style={{backgroundColor:"none"}} onClick={toggleNav}>Product</NavLink> {" "}
                <NavLink to="cartlist" onClick={toggleNav}>Cart</NavLink> {" "}
                <NavLink to="wishlist" onClick={toggleNav}>Wishlist</NavLink>
                <NavLink to="address" onClick={toggleNav}>User Info</NavLink>
                <NavLink to="login" onClick={toggleNav}>LogIn/LogOut</NavLink>
              </div>
            </div>
        </nav>

        <nav className="navigation">
          <span
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={toggleNav}
          >
            &#9776;
          </span>
          <NavLink to="home">
            <span>
              {/* <ion-icon name="home" style={{fontSize:"2rem"}}></ion-icon> */}
              <i className="material-icons" style={{fontSize:"2rem"}}>&#xe87a;</i>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}></span>
            </span>
          </NavLink>
          <NavLink to="cartlist">
            <span>
              <ion-icon name="cart" style={{fontSize:"2rem"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem",display:"flex-end"}}><CartHeader /></span>
            </span>
          </NavLink>
          <NavLink to="wishlist">
            <span>
              <ion-icon name="heart" style={{fontSize:"2rem"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}><WishListHeader /></span>
            </span>
          </NavLink>
          {/** for user */}
          <NavLink to="address">
              <ion-icon name="person" style={{fontSize: "1.8rem",border:"3px solid gray",borderRadius: "53px"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}></span>
          </NavLink>
          <NavLink to="login">
              <ion-icon name="power" style={{fontSize: "1.8rem",border:"3px solid gray",borderRadius: "53px"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}></span>
          </NavLink>
        </nav>
    </div>
  );
}

export default NavBar;