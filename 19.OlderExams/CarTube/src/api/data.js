import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAllCars: '/data/cars?sortBy=_createdOn%20desc',
    createCar: '/data/cars',
    getCarById: '/data/cars/',
    deleteCar: '/data/cars/',
    editCar: '/data/cars/'
}

export async function getAllCars(page) {
    return api.get(endpoints.getAllCars + `&offset=${ (page - 1) * 3 }&pageSize=3`);
}

export async function getCarById(id) {
    return api.get(endpoints.getCarById + id); 
}

export async function getMyCars(userId){
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createCar(car) {
    return api.post(endpoints.createCar, car);
}

export async function editCar(id, car) {
    return api.put(endpoints.editCar + id, car);
}

export async function deleteCar(id) {
    return api.del(endpoints.deleteCar + id);
}

export async function getCarsByYear(query){
    return api.get(`/data/cars?where=year%3D` + query);
}

export async function getColectionSize(){
    return api.get('/data/cars?count');
}