import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

// When using if statements, use TEST COVERAGE = test all conditions possible
describe("test suite: addToCart", () => {
  it("add an existing product to the cart", () => {});
  it("adds a new product to cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    // console.log(localStorage.getItem("cart"));
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
  });
});
