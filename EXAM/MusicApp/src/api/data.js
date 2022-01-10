import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAllAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    createAlbum: '/data/albums',
    getAlbumById: '/data/albums/',
    deleteAlbum: '/data/albums/',
    editAlbum: '/data/albums/'
}

export async function getAllAlbums() {
    return api.get(endpoints.getAllAlbums);
}

export async function getAlbumById(id) {
    return api.get(endpoints.getAlbumById + id); 
}

export async function createAlbum(album) {
    return api.post(endpoints.createAlbum, album);
}

export async function editAlbum(id, album) {
    return api.put(endpoints.editAlbum + id, album);
}

export async function deleteAlbum(id) {
    return api.del(endpoints.deleteAlbum + id);
}

export async function searchAlbums(query){
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}