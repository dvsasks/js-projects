let oldCart = JSON.parse(window.localStorage.getItem("cart"));
export let cart = oldCart
  ? oldCart
  : [
      // {
      //   id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      //   quantity: 1,
      // },
      // {
      //   id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      //   quantity: 2,
      // },
    ];
export function addToCart() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const selectCloset = button.closest(".product-container");
      const quantities = selectCloset.querySelector(
        ".js-select-product-quantity"
      ).value;
      let matchedItem;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchedItem = cartItem;
        }
      });
      if (matchedItem) {
        matchedItem.quantity = matchedItem.quantity + Number(quantities);
      } else {
        cart.push({
          productId: productId,
          quantity: Number(quantities),
        });
      }
      /* for updating cart bage in amazon homepage */
      document.querySelector(".js-cart-quantity").innerHTML = noOfCartItems();
      window.localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

export function noOfCartItems() {
  return cart.reduce((acc, cur) => (acc = acc + cur.quantity), 0);
}

export function removeCartItem(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

export function modifyCart(productId, quantity) {
  cart = cart.map((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = quantity;
    }
    return cartItem;
  });
}
