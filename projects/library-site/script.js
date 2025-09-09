// Sample books array
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image: "images/gatsby.jpg",
    genre: "Fiction",
    quantity: 1,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 10.99,
    image: "images/1984.jpg",
    genre: "Dystopian",
    quantity: 1,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    image: "images/mockingbird.jpg",
    genre: "Classic",
    quantity: 1,
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 11.99,
    image: "images/hobbit.jpg",
    genre: "Fantasy",
    quantity: 1,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.99,
    image: "images/pride.jpg",
    genre: "Romance",
    quantity: 1,
  },
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const bookGrid = document.getElementById("book-grid");
const cartToggle = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const genreFilter = document.getElementById("genre-filter");

// Populate genre filter
const genres = ["all", ...new Set(books.map((book) => book.genre))];
genres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreFilter.appendChild(option);
});

// Display books
function displayBooks(filteredBooks = books) {
  bookGrid.innerHTML = "";
  filteredBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p class="price">$${book.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
      </div>
    `;
    bookGrid.appendChild(card);

    // Animate
    setTimeout(() => card.classList.add("visible"), 100);
  });
}

// Initial display
displayBooks();

// Filter by genre
genreFilter.addEventListener("change", (e) => {
  const selected = e.target.value;
  if (selected === "all") displayBooks();
  else displayBooks(books.filter((book) => book.genre === selected));
});

// Toggle cart sidebar
cartToggle.addEventListener("click", () =>
  cartSidebar.classList.toggle("open")
);
closeCart.addEventListener("click", () => cartSidebar.classList.remove("open"));

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} x ${item.quantity} - $${(
      item.price * item.quantity
    ).toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
bookGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.dataset.id);
    const book = books.find((b) => b.id === id);

    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) cartItem.quantity += 1;
    else cart.push({ ...book });

    updateCart();
  }
});

// Checkout button
checkoutBtn.addEventListener("click", () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
});

// Initial cart display
updateCart();
