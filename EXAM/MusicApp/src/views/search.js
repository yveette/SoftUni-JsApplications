import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (albums, onSearch,  params = '') => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${albums.length == 0 
            ? html`<p class="no-result">No result.</p>`
            : html`${albums.map(albumCard)}`}
    </div>
</section>`;



// filter albums by their album's name

const albumCard = (album) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {
    let albums = [];
    const params = ctx.querystring.split('=')[1];
    if (params) {
        albums = await searchAlbums(params);
    }
    ctx.render(searchTemplate(albums, onSearch, params));

    const userData = await getUserData();
    if( userData == null) {
        document.querySelectorAll('.btn-group').forEach(el =>  el.remove());
    } 

    function onSearch(event) {
        event.preventDefault();
        const search = document.getElementById('search-input').value.trim();

        if( search == ''){
            alert('You must fill to field!');
        }
        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search))
        }
    }
}