document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList =
    document.getElementById("product-list") ||
    document.getElementById("seller-products");
  const categoryFilter = document.getElementById("categoryFilter");
  const locationFilter = document.getElementById("locationFilter");
  const clearAllBtn = document.getElementById("clearAll");
  const summaryStats = document.getElementById("summary-stats");

  const sampleProducts = [
    {
      name: "Handmade Jute Bag",
      description: "Eco-friendly jute bag perfect for daily use.",
      price: "350",
      seller: "Anita Sharma",
      phone: "919876543210",
      image: "https://i.imgur.com/Y5ZyoKe.jpg",
      location: "West Bengal",
      category: "Handmade Bags",
      soldOut: false,
    },
    {
      name: "Spicy Mango Pickle",
      description: "Traditional homemade mango pickle with authentic flavor.",
      price: "150",
      seller: "Kamla Devi",
      phone: "919812345678",
      image: "https://i.imgur.com/yvEbPeL.jpg",
      location: "Rajasthan",
      category: "Pickles & Snacks",
      soldOut: false,
    },
    {
      name: "Decorative Wall Hanging",
      description: "Handcrafted decorative piece for your home.",
      price: "500",
      seller: "Radha Kumari",
      phone: "919765432109",
      image: "https://i.imgur.com/CUTd0fk.jpg",
      location: "Uttar Pradesh",
      category: "Decor",
      soldOut: false,
    },
  ];

  const loadProducts = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length === 0) {
      products = sampleProducts;
      saveProducts(products);
    }
    return products;
  };

  const saveProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const renderSummary = (products) => {
    if (summaryStats) {
      const total = products.length;
      const sold = products.filter((p) => p.soldOut).length;
      const active = total - sold;
      summaryStats.textContent = `📦 Total Products: ${total} | ✅ Active: ${active} | ❌ Sold Out: ${sold}`;
    }
  };

  const renderProducts = () => {
    const products = loadProducts();
    if (!productList) return;

    productList.innerHTML = "";

    const category = categoryFilter?.value || "";
    const location = locationFilter?.value || "";

    const filtered = products.filter(
      (p) =>
        (category === "" || p.category === category) &&
        (location === "" || p.location === location)
    );

    filtered.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      // Sold Out Tag
      if (product.soldOut) {
        const soldTag = document.createElement("div");
        soldTag.className = "sold-out-label";
        soldTag.textContent = "Sold Out";
        card.appendChild(soldTag);
      }

      // Product Image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      if (product.soldOut) img.style.filter = "grayscale(100%) blur(1px)";
      card.appendChild(img);

      // Name
      const title = document.createElement("h3");
      title.textContent = product.name;
      card.appendChild(title);

      // Description
      const desc = document.createElement("p");
      desc.textContent = product.description;
      card.appendChild(desc);

      // Price
      const price = document.createElement("p");
      price.innerHTML = `<strong>₹${product.price}</strong>`;
      card.appendChild(price);

      // Seller + Location
      const sellerInfo = document.createElement("p");
      sellerInfo.innerHTML = `👩‍💼 ${product.seller} | 📍 ${product.location}`;
      card.appendChild(sellerInfo);

      // Buyer View
      if (productList.id === "product-list" && !product.soldOut) {
        const btn = document.createElement("a");
        const msg = `Hi, I'm interested in buying the "${product.name}". Is it available?`;
        btn.href = `https://wa.me/${product.phone}?text=${encodeURIComponent(
          msg
        )}`;
        btn.className = "buy-btn";
        btn.textContent = "Buy on WhatsApp";
        btn.target = "_blank";
        card.appendChild(btn);
      }

      // Seller View
      if (productList.id === "seller-products") {
        const soldBtn = document.createElement("button");
        soldBtn.textContent = "✅ Mark as Sold";
        soldBtn.className = "sold-btn";
        soldBtn.onclick = () => {
          products[index].soldOut = true;
          saveProducts(products);
          renderProducts();
        };

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "🗑️ Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => {
          const confirmDelete = confirm(
            `Are you sure you want to remove "${product.name}"?`
          );
          if (confirmDelete) {
            products.splice(index, 1);
            saveProducts(products);
            renderProducts();
          }
        };

        card.appendChild(soldBtn);
        card.appendChild(removeBtn);
      }

      productList.appendChild(card);
    });

    renderSummary(products);
  }; // <-- This closing brace was missing earlier!

  // Handle Add Product Form
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        seller: document.getElementById("seller").value,
        phone: document.getElementById("phone").value,
        image: document.getElementById("image").value,
        location: document.getElementById("location").value,
        category: document.getElementById("category").value,
        soldOut: false,
      };

      const products = loadProducts();
      products.push(product);
      saveProducts(products);
      productForm.reset();
      renderProducts();
    });
  }

  // Filter Events
  categoryFilter?.addEventListener("change", renderProducts);
  locationFilter?.addEventListener("change", renderProducts);

  // Clear All Products (in seller dashboard)
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      const confirmClear = confirm(
        "Are you sure you want to delete all products?"
      );
      if (confirmClear) {
        saveProducts([]);
        renderProducts();
      }
    });
  }

  renderProducts();
}); // <-- This was also missing previously!
