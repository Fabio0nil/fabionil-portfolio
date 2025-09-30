// Expanded books array with more variety
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image: "https://via.placeholder.com/200x300/00bfa6/ffffff?text=Gatsby",
    genre: "Fiction",
    quantity: 1,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 10.99,
    image: "https://via.placeholder.com/200x300/a64dff/ffffff?text=1984",
    genre: "Dystopian",
    quantity: 1,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    image: "https://via.placeholder.com/200x300/ff6b6b/ffffff?text=Mockingbird",
    genre: "Classic",
    quantity: 1,
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 11.99,
    image: "https://via.placeholder.com/200x300/4ecdc4/ffffff?text=Hobbit",
    genre: "Fantasy",
    quantity: 1,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.99,
    image: "https://via.placeholder.com/200x300/ffd93d/ffffff?text=Pride",
    genre: "Romance",
    quantity: 1,
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    price: 15.99,
    image: "https://via.placeholder.com/200x300/6c5ce7/ffffff?text=Dune",
    genre: "Science Fiction",
    quantity: 1,
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 13.99,
    image: "https://via.placeholder.com/200x300/fd79a8/ffffff?text=Catcher",
    genre: "Classic",
    quantity: 1,
  },
  {
    id: 8,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 16.99,
    image: "https://via.placeholder.com/200x300/00b894/ffffff?text=Harry+Potter",
    genre: "Fantasy",
    quantity: 1,
  },
  {
    id: 9,
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    price: 12.99,
    image: "https://via.placeholder.com/200x300/e17055/ffffff?text=Handmaid",
    genre: "Dystopian",
    quantity: 1,
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 11.99,
    image: "https://via.placeholder.com/200x300/74b9ff/ffffff?text=Alchemist",
    genre: "Fiction",
    quantity: 1,
  },
  {
    id: 11,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 18.99,
    image: "https://via.placeholder.com/200x300/a29bfe/ffffff?text=Sapiens",
    genre: "Non-Fiction",
    quantity: 1,
  },
  {
    id: 12,
    title: "The Martian",
    author: "Andy Weir",
    price: 14.99,
    image: "https://via.placeholder.com/200x300/fd79a8/ffffff?text=Martian",
    genre: "Science Fiction",
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
const searchBar = document.getElementById("search-bar");

// Populate genre filter
const genres = ["all", ...new Set(books.map((book) => book.genre))];
genres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreFilter.appendChild(option);
});

// Display books with search and filter
function displayBooks(filteredBooks = books) {
  bookGrid.innerHTML = "";
  
  if (filteredBooks.length === 0) {
    bookGrid.innerHTML = `
      <div class="no-results animate-fade-in">
        <h3>No books found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }
  
  filteredBooks.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card animate-scale-up";
    card.style.transitionDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p class="genre">${book.genre}</p>
        <p class="price">$${book.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
      </div>
    `;
    bookGrid.appendChild(card);

    // Trigger animation
    setTimeout(() => card.classList.add("visible"), 50);
  });
}

// Initial display
displayBooks();

// Search and filter functionality
function filterBooks() {
  const searchTerm = searchBar.value.toLowerCase().trim();
  const selectedGenre = genreFilter.value;
  const maxPrice =
    parseFloat(document.getElementById("price-filter").value) || Infinity;

  let filteredBooks = books.filter((book) => {
    const matchesSearch =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);

    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;
    const matchesPrice = book.price <= maxPrice;

    return matchesSearch && matchesGenre && matchesPrice;
  });

  displayBooks(filteredBooks);
}

// Event listeners for search and filters
searchBar.addEventListener("input", filterBooks);
genreFilter.addEventListener("change", filterBooks);
document.getElementById("price-filter").addEventListener("input", filterBooks);

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
