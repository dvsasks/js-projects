import { cart, removeCartItem, modifyCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormatting } from "../utils/money.js";

renderCheckOutPage();

function renderCheckOutPage() {
  let productsLookUp = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
  let cartItemsInnerHtml = "";
  cart.forEach((cartitem) => {
    const product = productsLookUp[cartitem.productId];
    if (product.id === cartitem.productId) {
      cartItemsInnerHtml =
        cartItemsInnerHtml.concat(`<div class="cart-item-container js-cart-item-container">    
              <div class="delivery-date">Delivery date: Tuesday, June 21</div>
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
                  <span data-product-id=${
                    product.id
                  } class="update-quantity-link link-primary js-update-quantity">
                    Update
                  </span>
                  <span class='new-quantity'  hidden>
                    <input class='new-quantity-input' type='number' value=${
                      cartitem.quantity
                    }>
                    <span class='update-quantity-link link-primary js-save-new-quantity'
                    data-product-id=${product.id}
                    >save
                    </span>
                    </span>
                  <span data-product-id=${
                    product.id
                  } class="delete-quantity-link link-primary js-delete-quantity">
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
          </div>;`);
    }
  });
  document.querySelector(".js-order-summary").innerHTML = cartItemsInnerHtml;
  generatePaymentSummary();
  bindEventListners();
}
function bindEventListners() {
  document.querySelectorAll(".js-delete-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      removeCartItem(event.target.dataset.productId);
      renderCheckOutPage();
    });
  });
  document.querySelectorAll(".js-update-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const updatecloset = button.closest(".product-quantity");
      updatecloset.querySelector(".new-quantity").hidden = false;
      updatecloset.querySelector(".quantity-label").hidden = true;
      button.hidden = true;
    });
  });
  document.querySelectorAll(".js-save-new-quantity").forEach((saveButton) => {
    saveButton.addEventListener("click", (event) => {
      modifyCart(
        event.target.dataset.productId,
        saveButton.closest(".new-quantity").querySelector(".new-quantity-input")
          .value
      );
      renderCheckOutPage();
    });
  });
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
      if (product.id === cartItem.productId) {
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
