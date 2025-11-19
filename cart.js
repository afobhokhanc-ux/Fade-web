// =============== CART HANDLER =================

// Get the cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
updateCartCount();

// Add product to cart when button is clicked
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    // Check if item already exists in cart
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update count in navbar
    updateCartCount();

    alert(`${name} added to cart 🛒`);
  });
});

// If on cart.html, render cart items
if (window.location.pathname.includes("cart.html")) {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartContainer) {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <p><strong>${item.name}</strong> - ₦${item.price} x ${item.quantity}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(div);
      });

      // Total price
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (cartTotal) cartTotal.textContent = `₦${total}`;
    }
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
