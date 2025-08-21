import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// Promise.all() lets us run multiple promises at the same time and waits for all of them to finish
Promise.all([
  new Promise((resolve) => {
    //start promise
    loadProducts(() => {
      //finished loading
      resolve("value1");
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  console.log(values);
  renderPaymentSummary();
  renderOrderSummary();
});

/*
// resolve lets us control when to go to the next step
new Promise((resolve) => {
  //console.log("start promise");
  loadProducts(() => {
    //console.log("finished loading");
    resolve("value1");
  });
}).then((value) => {
  //console.log("next step");
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderPaymentSummary();
    renderOrderSummary();
  });
});
*/
////////////////////

// CALLBACK
//Multiple callbacks cause a lot of nesting.
/*
loadProducts(() => {
  loadCart(() => {
    renderPaymentSummary();
    renderOrderSummary();
  });
});
*/
