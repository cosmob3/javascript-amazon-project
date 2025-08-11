class Cart {
  cartItems;
  localStorageKey;

  //Constructor is used as a setup for whatever else needs to run => In this case checking any localStorageKey to load up appropriate cart
  // Should not return() anything
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage() {
    this.cartItems = localStorage.getItem(this.localStorageKey);

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    //CHECK IF PRODUCT ALREADY EXISTS IN CART
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
        //console.log(matchingItem);
      }
    });

    //updating cart
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity, deliveryOptionId: "1" });
    }

    this.saveToStorage();
  }
  removeFromCart(productId) {
    let newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

////////////

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
////////////////////
/*
export function calculateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return totalQuantity;
}

export function updateQuantity(productId, quantity) {
  //CHECK IF PRODUCT ALREADY EXISTS IN CART
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      //console.log(matchingItem);
    }
  });

  //updating cart
  if (matchingItem) {
    matchingItem.quantity = quantity;
  } else {
    cart.push({ productId, quantity });
  }
  saveToStorage();
}
*/
