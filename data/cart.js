export const cart = [];

export function addToCart(productId, quantity) {
  //CHECK IF PRODUCT ALREADY EXISTS IN CART
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //updating cart
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  updateCartQuantity();
  //const selectorQuantity = quantitySelector.value;
}

function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}
