export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
];
export function addToCart() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      let matchedItem;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchedItem = cartItem;
        }
      });
      if (matchedItem) {
        matchedItem.quantity = matchedItem.quantity + 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }
      /* for updating cart bage in amazon homepage */
      document.querySelector(".js-cart-quantity").innerHTML = noOfCartItems();
      console.log(cart);
    });
  });
}

export function noOfCartItems() {
  let itemsCount = 0;
  cart.forEach((cartItem) => {
    itemsCount = itemsCount + cartItem.quantity;
  });
  return itemsCount;
}
