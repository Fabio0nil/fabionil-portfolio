document.addEventListener("DOMContentLoaded", () => {
  const bookGrid = document.getElementById("book-grid");

  // Example dummy book
  const books = [
    {
      title: "Sample Book",
      genre: "Fiction",
      price: "10.99",
      cover: "https://via.placeholder.com/150x220",
    },
  ];

  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p class="price">$${book.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    bookGrid.appendChild(card);
  });
});
