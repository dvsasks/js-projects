export const cart = [];
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

