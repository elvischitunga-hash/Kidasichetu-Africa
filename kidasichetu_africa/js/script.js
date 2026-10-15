// Kidasichetu Africa interactions
// IMPORTANT: Replace 254759956943 in index.html with your real WhatsApp number.
// Use country code and number only: no + sign, spaces or dashes.
document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
    });
  }

  const cartStatus = document.getElementById("cartStatus");
  let cart = [];
  try {
    const savedCart = JSON.parse(localStorage.getItem("kidasichetuCart") || "[]");
    if (Array.isArray(savedCart)) cart = savedCart;
  } catch (error) {
    cart = [];
  }

  function updateCartStatus() {
    const itemCount = cart.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
    if (cartStatus) cartStatus.querySelector("span").textContent = "Cart: " + itemCount + (itemCount === 1 ? " item" : " items");
  }

  updateCartStatus();

  document.querySelectorAll(".product-card").forEach(function (card) {
    const productName = card.querySelector(".product-info h3")?.textContent.trim();
    const productInfo = card.querySelector(".product-info");
    if (!productName || !productInfo) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "add-to-cart";
    button.textContent = "Add to cart";
    button.setAttribute("aria-label", "Add " + productName + " to cart");
    button.addEventListener("click", function () {
      const existingItem = cart.find(function (item) {
        return item.name === productName;
      });
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: productName, quantity: 1 });
      }

      try {
        localStorage.setItem("kidasichetuCart", JSON.stringify(cart));
      } catch (error) {
        // Keep the cart usable for this visit when storage is unavailable.
      }

      updateCartStatus();
      button.textContent = "Added to cart";
      window.setTimeout(function () {
        button.textContent = "Add to cart";
      }, 1500);
    });
    productInfo.appendChild(button);
  });

  // Product inquiry links build a message containing the selected product.
  document.querySelectorAll("[data-product]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const product = link.getAttribute("data-product");
      const message = "Hello Kidasichetu Africa, I am interested in the " + product + ". Please share more details, availability and the current price.";
      const url = "https://wa.me/254759956943?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  // Close the mobile navigation after selecting an anchor.
  document.querySelectorAll("#mainNav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const nav = document.getElementById("mainNav");
      if (nav && nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
