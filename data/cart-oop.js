function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = localStorage.getItem(localStorageKey);
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },
    removeFromCart(productId) {
      let newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;

      this.saveToStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("business-cart");

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
// export let cart = undefined;
/*
export function loadFromStorage() {
  const cartData = localStorage.getItem("cart");
  cart = cartData
   / ? JSON.parse(cartData)
    : [
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
*/
/*
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
*/
/*
export function addToCart(productId, quantity) {
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
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, deliveryOptionId: "1" });
  }

  saveToStorage();
  //const selectorQuantity = quantitySelector.value;
}
*/
/*
export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}
*/
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

/*
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
*/
/*
const businessCart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = localStorage.getItem("cart-business");
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
  },

  saveToStorage() {
    localStorage.setItem("cart-business", JSON.stringify(this.cartItems));
  },

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
  },
  removeFromCart(productId) {
    let newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();
  },
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  },
};

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
*/
