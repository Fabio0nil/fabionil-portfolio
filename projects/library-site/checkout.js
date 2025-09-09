document.addEventListener("DOMContentLoaded", () => {
  // Load cart from LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Elements
  const checkoutCartItems = document.getElementById("checkout-cart-items");
  const checkoutCartTotal = document.getElementById("checkout-cart-total");
  const paymentForm = document.getElementById("payment-form");
  const modal = document.getElementById("confirmation-modal");
  const closeModal = document.getElementById("close-modal");
  const backHome = document.getElementById("back-home");

  if (!paymentForm) return; // safety check

  // Display cart items
  function displayCheckoutCart() {
    checkoutCartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        ${item.title} x
        <input type="number" min="1" value="${
          item.quantity
        }" data-index="${index}" class="quantity-input">
        - $${(item.price * item.quantity).toFixed(2)}
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      checkoutCartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    checkoutCartTotal.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Quantity change
  checkoutCartItems.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity-input")) {
      const index = parseInt(e.target.dataset.index);
      const value = parseInt(e.target.value);
      if (value > 0) {
        cart[index].quantity = value;
        displayCheckoutCart();
      }
    }
  });

  // Remove item
  checkoutCartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.dataset.index);
      const li = e.target.parentElement;
      li.classList.add("removing");
      setTimeout(() => {
        cart.splice(index, 1);
        displayCheckoutCart();
      }, 300);
    }
  });

  // Payment submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    modal.style.display = "flex"; // show modal
    localStorage.removeItem("cart");
    cart = [];
    displayCheckoutCart();
  });

  // Modal close
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Back home
  backHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  displayCheckoutCart();
});
