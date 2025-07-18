import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

import { renderPaymentSummary } from "./paymentSummary.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderOrderSummary() {
  updateCart();

  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
          <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span class=""> Quantity: <span class="quantity-label js-product-quantity-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>

               
                  <input class="quantity-input js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="link-primary save-quantity-link js-save-quantity" data-product-id="${
                    matchingProduct.id
                  }">Save</span>


                  <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
           `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `   <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id=${deliveryOption.id}>
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div class="delivery-option-fix">
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}Shipping</div>
                  </div>
                </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-quantity").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCart();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-quantity").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  //////////////
  document.querySelectorAll(".js-save-quantity").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");

      const quantitySelector = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      const selectedQuantity = quantitySelector.value;

      const quantity = Number(selectedQuantity);

      if (quantity >= 0 && quantity < 1000) {
        document.querySelector(
          `.js-product-quantity-${productId}`
        ).innerHTML = ` ${quantity}`;
        updateQuantity(productId, quantity);
        updateCart();
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll(".js-save-quantity").forEach((link) => {
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const productId = link.dataset.productId;

        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-editing-quantity");

        const quantitySelector = document.querySelector(
          `.js-quantity-input-${productId}`
        );

        const selectedQuantity = quantitySelector.value;

        const quantity = Number(selectedQuantity);

        if (quantity >= 0 && quantity < 1000) {
          document.querySelector(
            `.js-product-quantity-${productId}`
          ).innerHTML = ` ${quantity}`;

          updateQuantity(productId, quantity);

          updateCart();
        }
      }
    });
  });

  ///////////////

  function updateCart() {
    const totalQuantity = calculateCartQuantity();

    document.querySelector(
      ".js-checkout-header"
    ).innerHTML = `Checkout (${totalQuantity})`;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
