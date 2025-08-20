import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";

// resolve lets us control when to go to the next step
new Promise((resolve) => {
  console.log("start promise");
  loadProducts(() => {
    console.log("finished loading");
    resolve();
  });
}).then(() => {
  console.log("next step");
});

/*
loadProducts(() => {
  renderPaymentSummary();
  renderOrderSummary();
});
*/
