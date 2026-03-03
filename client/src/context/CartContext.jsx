import React, { createContext, useContext, useEffect, useState } from "react";
import {
  add_to_cart_logic,
  decrease_quantity,
  get_total_price,
  increase_quantity,
  itemCount,
  remove_from_cart,
} from "../utility/cartFunctions";

const CartData = createContext();
function CartContext({ children }) {
  //access the cart state element from the browser local storage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartInBrowser");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    //save cart to the browser local storage
    localStorage.setItem("cartInBrowser", JSON.stringify(cart));
  }, [cart]);

  //add to cart
  const add_to_cart = (singleProduct) => {
    setCart((prev) => {
      return add_to_cart_logic(singleProduct, prev);
    });
  };

  //remove item entirly
  const deleteSingleItem = (singleProduct) => {
    setCart((prev) => {
      return remove_from_cart(singleProduct, prev);
    });
  };

  //increase quantity
  const increaseItemQuantity = (singleProduct) => {
    setCart((prevCartItem) => {
      return increase_quantity(singleProduct, prevCartItem);
    });
  };

  //decrease quantity here
  const decreaseItemQuantity = (singleProduct) => {
    setCart((prevCartItem) => {
      return decrease_quantity(singleProduct, prevCartItem);
    });
  };

  //total item in the cart
  const getItemCount = itemCount(cart);

  //clear cart after successful payment
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartData.Provider
      value={{
        cart,
        add_to_cart,
        deleteSingleItem,
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemCount,
        get_total_price,
        clearCart,
      }}
    >
      {children}
    </CartData.Provider>
  );
}

export default CartContext;

//create custom hook for cart => which pass all the values as a prop

export const useCart = () => useContext(CartData);
