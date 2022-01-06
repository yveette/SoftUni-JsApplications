import { createGameComment, deleteGame, getGameById, getGameComments } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, comments, canComment, addComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 
                ? html`<p class="no-comment">No comments.</p>` 
                : html`<ul>${comments.map(commentTemplate)}</ul>`}
        </div>

        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}

    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${canComment 
        ? html`<article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${addComment}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : null}

    
</section>`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const gameId = ctx.params.id;
    const [game, userData, comments] = await Promise.all([
        getGameById(gameId),
        getUserData(),
        getGameComments(gameId)
    ])
    const isOwner = userData && game._ownerId == userData.id;
    let canComment;
    if( userData != null && isOwner == false){
        canComment = true;
    }

    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, canComment, addComment));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }

    async function addComment(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const comment = formData.get('comment').trim();
        if( comment == ''){
            alert('The field is required!');
        }
        
        await createGameComment({gameId,comment});
        ev.target.reset();
        ctx.page.redirect(`/details/${gameId}`);
    }
}