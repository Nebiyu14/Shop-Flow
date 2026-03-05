import React from "react";
import "./navbar.css";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cart, getItemCount } = useCart();

  return (
    <nav className="navbar__container">
      <h2 className="header__brand__name">
        <Link to={"/"}>Shop Flow</Link>
      </h2>

      <ul className="header__nav__links">
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"#"}>Orders</Link>
        </li>
        <li>
          <Link to={"#"}>FAQ</Link>
        </li>
        <li>
          <Link to={"#"}>Account</Link>
        </li>
      </ul>

      <div className="header__cart">
        <Link to={"/cart"} className="header__cart__link">
          <ShoppingCartCheckoutIcon fontSize="small" />
          <span>Cart</span>
          {cart?.length > 0 && (
            <span className="header__cart__badge">{getItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
