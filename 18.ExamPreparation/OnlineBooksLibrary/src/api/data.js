import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAllBooks: '/data/books?sortBy=_createdOn%20desc',
    createBook: '/data/books',
    getBookById: '/data/books/',
    deleteBook: '/data/books/',
    editBook: '/data/books/',
    addLike: '/data/likes',
}

export async function getAllBooks() {
    return api.get(endpoints.getAllBooks);
}

export async function createBook(book) {
    return api.post(endpoints.createBook, book);
}

export async function getBookById(id) {
    return api.get(endpoints.getBookById + id);
}

export async function editBook(id, book) {
    return api.put(endpoints.editBook + id, book);
}

export async function deleteBook(id) {
    return api.del(endpoints.deleteBook + id);
}

export async function getMyBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// Bonus -> Likes
export async function addLike(bookId) {
    return api.post(endpoints.addLike, {bookId});
}

export async function allLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function likesForLog(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

// search
export async function searchBooks(query) {
    return api.get(`/data/books?where=` + encodeURIComponent(`title LIKE "${query}"`));
}