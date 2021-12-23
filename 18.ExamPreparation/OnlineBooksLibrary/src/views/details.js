import { deleteBook, getBookById, addLike, allLikes, likesForLog } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeBtn, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${bookControlsTemplate(book, isOwner, onDelete)}
            ${likeControlsTemplate(showLikeBtn, onLike)}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

const bookControlsTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>`;
    } else {
        return null;
    }
}

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>`;
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    const bookId = ctx.params.id;
    const userData = await getUserData();

    const [book, likes, hasLiked] = await Promise.all([
        getBookById(bookId),
        allLikes(bookId),
        userData ? likesForLog(bookId, userData.id) : 0
    ]);

    const isOwner = userData && book._ownerId == userData.id;
    const showLikeBtn = userData != null && isOwner == false && hasLiked == false;
    
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this book?');
        if (choice) {
            await deleteBook(bookId);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        if (isOwner == false) {
            await addLike(bookId);
            ctx.page.redirect(`/details/${bookId}`);
        }
    }
}