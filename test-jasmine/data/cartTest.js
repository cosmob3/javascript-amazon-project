import { cart, addToCart, loadFromStorage } from "../../data/cart.js";
/*
// When using if statements, use TEST COVERAGE = test all conditions possible
describe("test suite: addToCart", () => {
  it("add an existing product to the cart", () => {
    spyOn(localStorage, "setItem").and.callFake(() => {});

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    //console.log(localStorage.getItem("cart"));
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId.toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"));
    expect(cart[0].quantity).toEqual(2);
  });

  it("add a new product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem("cart"));

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId.toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"));
    expect(cart[0].quantity).toEqual(1);
  });
});

*/

describe("test suite: addToCart", () => {
  beforeEach(() => {
    cart.length = 0; // reset the shared cart state

    // Reset localStorage mock before each test
    spyOn(localStorage, "setItem").and.callFake(() => {});
  });

  it("adds to an existing product in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2); // 1 + 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem("cart"));
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    console.log(cart.length);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
