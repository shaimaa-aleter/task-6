
const featuredBooksAPI = "https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books";
const oneBookAPI = "https://wolnelektury.pl/api/books/studnia-i-wahadlo/";

const featuredBooksSection = document.getElementById("featured-books");
const popularBooksSection = document.getElementById("popular-books");
const bestSellingBookSection = document.getElementById("best-selling-book");

async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function renderFeaturedBooks() {
    const booksData = await fetchData(featuredBooksAPI);
    if (booksData) {
        const featuredBooks = booksData.slice(-4); 
        featuredBooksSection.innerHTML = `<h3 class="mb-4">Featured Books</h3>`;
        featuredBooks.forEach(book => {
            featuredBooksSection.innerHTML += `
                <div class="col-12 col-sm-6 col-md-3 mb-4">
                    <div class="card">
                        <img src="${book.simple_thumb}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author: ${book.author}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}


async function renderPopularBooks() {
    const booksData = await fetchData(featuredBooksAPI);
    if (booksData) {
        const popularBooks = booksData.slice(0, 8); 
        popularBooksSection.innerHTML = `<h3 class="mb-4">Popular Books</h3>`;
        popularBooks.forEach(book => {
            popularBooksSection.innerHTML += `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${book.simple_thumb}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author: ${book.author}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}


async function renderBestSellingBook() {
    const bookData = await fetchData(oneBookAPI);
    if (bookData) {
        bestSellingBookSection.innerHTML = `
            <h3 class="mb-4">Best Selling Book</h3>
            <div class="card mb-3">
                <img src="${bookData.cover}" class="card-img-top" alt="${bookData.title}">
                <div class="card-body">
                    <h4 class="card-title">${bookData.title}</h4>
                    <p class="card-text">Author: ${bookData.authors[0]}</p>
                    <p class="card-text">${bookData.fragment_data}</p>
                </div>
            </div>
        `;
    }
}
async function init() {
    await renderFeaturedBooks();
    await renderPopularBooks();
    await renderBestSellingBook();
}


document.addEventListener("DOMContentLoaded", init);
