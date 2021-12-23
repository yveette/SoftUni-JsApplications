import { searchBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (books, onSearch, params = '') => html`
<section id="search-page" class="dashboard">
    <h1>Search</h1>

    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>
        <input type="submit" value="search">
    </form>

    ${books.length == 0 
        ? html`<p class="no-books">Not found!</p>`
        : html`<ul class="other-books-list">${books.map(bookCard)}</ul>`}
</section>`;


const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function searchPage(ctx) {
    let books = [];
    const params = ctx.querystring.split('=')[1];
    if (params){
        books = await searchBooks(decodeURIComponent(params))
    }
    ctx.render(searchTemplate(books, onSearch, params));

    function onSearch(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const search = formData.get('search');
        
        if(search){
            ctx.page.redirect('/search?query=' + encodeURIComponent(search))
        }
    }
}