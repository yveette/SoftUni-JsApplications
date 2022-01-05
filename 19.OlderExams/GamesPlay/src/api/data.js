import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAllGames: '/data/games?sortBy=_createdOn%20desc',
    latesGames: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    createGame: '/data/games',
    getGameById: '/data/games/',
    deleteGame: '/data/games/',
    editGame: '/data/games/'
}

export async function getAllGames() {
    return api.get(endpoints.getAllGames);
}

export async function latesGames() {
    return api.get(endpoints.latesGames);
}

export async function createGame(game) {
    return api.post(endpoints.createGame, game);
}

export async function getGameById(id) {
    return api.get(endpoints.getGameById + id); 
}

export async function editGame(id, game) {
    return api.put(endpoints.editGame + id, game);
}

export async function deleteGame(id) {
    return api.del(endpoints.deleteGame + id);
}

// Bonus
export async function getGameComments(gameId){
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createGameComment(comment){
    return api.post('/data/comments', comment);
}