// All the cart logic and functions are defined here
//============================================
// 1. ADD TO CART Function
//============================================

const add_to_cart_logic = (singleProduct, prevCartItems) => {
  //1. check if the item already existing
  const existingItem = prevCartItems?.find(
    (item) => item.id === singleProduct.id,
  );

  //1.1. no? => add to cart with quantity = 1
  if (!existingItem) {
    return [...prevCartItems, { ...singleProduct, quantity: 1 }];
  } else {
    //1.2. existing = > increase quantity = cart.quantity + 1
    return prevCartItems.map((item) =>
      item.id === singleProduct.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
};

//============================================
//2. REMOVE FROM CART
//============================================

const remove_from_cart = (singleProduct, prev) => {
  return prev.filter((item) => item.id !== singleProduct.id);
};

//============================================
//3. INCREASE ITEM QUANTITY
//============================================

const increase_quantity = (singleProduct, prevCartItem) => {
  return prevCartItem.map((item) => {
    return item.id === singleProduct.id
      ? { ...item, quantity: item.quantity + 1 }
      : item;
  });
};

//============================================
//4. DECREASE ITEM QUANTITY
//============================================

const decrease_quantity = (singleProduct, prevCartItem) => {
  return prevCartItem
    .map((item) => {
      return item.id === singleProduct.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    })
    .filter((item) => item.quantity > 0);
};

//============================================
//4. TOTAL PRICE
//============================================
const get_total_price = (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

//============================================
//5. TOTAL NUMBER OF ITEMS => item x quantity
//============================================
  const itemCount = (cart) => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
//============================================

export {
  add_to_cart_logic,
  remove_from_cart,
  increase_quantity,
  decrease_quantity,
  get_total_price,
  itemCount,
};
