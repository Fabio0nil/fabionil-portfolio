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

  // Payment submission with validation
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if cart is empty
    if (cart.length === 0) {
      showError("Your cart is empty!");
      return;
    }

    // Validate form fields
    const formData = new FormData(paymentForm);
    const cardName =
      formData.get("cardName") ||
      paymentForm.querySelector('input[placeholder="Cardholder Name"]').value;
    const cardNumber =
      formData.get("cardNumber") ||
      paymentForm.querySelector('input[placeholder="Card Number"]').value;
    const expiration =
      formData.get("expiration") ||
      paymentForm.querySelector('input[placeholder="Expiration"]').value;
    const cvv =
      formData.get("cvv") ||
      paymentForm.querySelector('input[placeholder="CVV"]').value;

    // Validation checks
    if (!cardName.trim()) {
      showError("Please enter the cardholder name");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      showError("Please enter a valid card number (16 digits)");
      return;
    }

    if (!validateExpiration(expiration)) {
      showError("Please enter a valid expiration date (MM/YY)");
      return;
    }

    if (!validateCVV(cvv)) {
      showError("Please enter a valid CVV (3 digits)");
      return;
    }

    // Show loading state
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;

    // Simulate processing delay
    setTimeout(() => {
      modal.style.display = "flex"; // show modal
      localStorage.removeItem("cart");
      cart = [];
      displayCheckoutCart();

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

  // Validation helper functions
  function validateCardNumber(number) {
    const cleanNumber = number.replace(/\s/g, "");
    return /^\d{16}$/.test(cleanNumber);
  }

  function validateExpiration(exp) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
  }

  function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
  }

  function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      background: #ff4444;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
      text-align: center;
    `;

    // Insert before form
    paymentForm.parentNode.insertBefore(errorDiv, paymentForm);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

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
