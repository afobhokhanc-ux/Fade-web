// product.js

// --- PRODUCT DATA ---


// --- FUNCTION TO DISPLAY PRODUCTS ---
function displayProducts(productList) {
  const container = document.querySelector(".product-grid");
  container.innerHTML = "";

  if (!productList || productList.length === 0) {
    container.innerHTML =
      `<p style="text-align:center;width:100%;">No products found.</p>`;
    return;
  }

  productList.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <p>₦${p.price}</p>
        <button>Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}


// --- INITIAL LOAD ---
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

if (!query || query.toLowerCase() === "all") {
  // No search or "All" → show all products
  displayProducts(products);
} else {
  const searchTerm = query.toLowerCase();

  // Filter by either category OR name/description
  const filtered = products.filter(p =>
    p.category.toLowerCase() === searchTerm ||
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
  );

  if (filtered.length > 0) {
    displayProducts(filtered);
  } else {
    document.querySelector(".product-grid").innerHTML =
      `<p style="text-align:center;width:100%;">No products found for "${query}"</p>`;
  }
}
// --- CATEGORY FILTERING ---
document.querySelectorAll(".category-drawer a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedCategory = e.target.getAttribute("data-category");

    // Filter products
    if (selectedCategory === "All") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => 
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      displayProducts(filtered);
    }

    // Close drawer after selecting (optional)
    document.getElementById("categoryDrawer").classList.remove("open");
  });
});
