import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormatting } from "../utils/money.js";

renderCheckOutPage();

function renderCheckOutPage() {

  let cartItemsInnerHtml;
  cart.forEach((cartitem) => {
    products.forEach((product) => {
      if (product.id === cartitem.id) {
        cartItemsInnerHtml =
          cartItemsInnerHtml +
          `<div class="cart-item-container js-cart-item-container">        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src=${product.image}
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">₹${(
                  product.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartitem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                    ${generateOptions(product.id)}
                </div>
            </div>
          </div>;`;
      }
    });
  });

  generatePaymentSummary();
  document.querySelector(".js-order-summary").innerHTML = cartItemsInnerHtml;
  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => generatePaymentSummary());
  });
}

function generateOptions(productId) {
  let optionString = "";
  let optionsArray = [
    { id: 1, amount: 0, days: 7 },
    { id: 2, amount: 499, days: 4 },
    { id: 3, amount: 999, days: 1 },
  ];
  optionsArray.forEach((option, index) => {
    optionString =
      optionString +
      `<div class="delivery-option">
                  <input
                    type="radio"
                    ${index === 0 ? "checked" : ""}
                    class="delivery-option-input"
                    name=${productId}
                    value=${option.amount}
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">${
                      option.amount === 0
                        ? "FREE"
                        : "$" + (option.amount / 100).toFixed(2)
                    } Shipping</div>
                  </div>
                </div> `;
  });

  return optionString;
}

function generatePaymentSummary() {
  let totalItemPrice = 0;
  let totalShippingPrice = 0;

  document.querySelectorAll(".delivery-options").forEach((section) => {
    const selectedOption = section.querySelector('input[type="radio"]:checked');
    if (selectedOption) {
      totalShippingPrice += parseFloat(selectedOption.value);
    }
  });
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.id) {
        totalItemPrice =
          product.priceCents * cartItem.quantity + totalItemPrice;
      }
    });
  });
  let taxAmount = (totalItemPrice + totalShippingPrice) * 0.1;
  let totalCostBeforeTax = totalItemPrice + totalShippingPrice;
  let totalOrderCost = totalCostBeforeTax + taxAmount;
  console.log(taxAmount);
  document.querySelector(".items-price").innerHTML =
    moneyFormatting(totalItemPrice);
  document.querySelector(".estimated-tax").innerHTML =
    moneyFormatting(taxAmount);
  document.querySelector(".shipping-handling-charges").innerHTML =
    totalShippingPrice ? (totalShippingPrice / 100).toFixed(2) : 0.0;
  document.querySelector(".total-price").innerHTML =
    moneyFormatting(totalCostBeforeTax);
  document.querySelector(".order-total").innerHTML =
    moneyFormatting(totalOrderCost);
}
