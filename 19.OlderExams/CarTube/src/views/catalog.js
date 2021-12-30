import { getAllCars, getColectionSize } from '../api/data.js';
import { html } from '../lib.js';

const catalogTemplate = (cars, page, pages) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        <!-- Bonnus Pages -->
        <div>
            Page ${page} / ${pages}
            ${page > 1 ? html`<a class="button-list" href="/catalog?page=${page-1}">&lt; Prev</a>` : ''}
            ${page < pages ? html`<a class="button-list" href="/catalog?page=${page+1}">Next &gt;</a>`: ''}
        </div>

        ${cars.length == 0 
            ? html`<p class="no-cars">No cars in database.</p>`
            : cars.map(carCard)}        
    </div>
</section>`;

const carCard = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function catalogPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    const count = await getColectionSize();
    const pages = Math.ceil(count / 3);
    const cars = await getAllCars(page);
    ctx.render(catalogTemplate(cars,page, pages));
}