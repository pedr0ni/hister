import Service, { BaseService } from './Service'
import authenticationConfig from '../config/authentication.json'
import { AsyncStorage } from 'react-native'
import CartService from './CartService'
import { Book } from '../models/Book'

class UserService extends BaseService {

    constructor() {
        super()
        this.loadToken()
    }

    async loadToken() {
        const token = await this.getToken()
        if (token)
            Service.axios.defaults.headers = {
                Authorization: `Bearer ${token}`
            }
    }

    authenticate(body : object) {
        return Service.postWithDelay('/user/authenticate', body)
    }

    register(body : object) {
        return Service.postWithDelay('/user/register', body)
    }

    info () {
        return Service.getWithDelay('/user/info')
    }

    async setToken(token: string) {
        await AsyncStorage.setItem('Authorization', token)
        Service.axios.defaults.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    async logout() {
        await CartService.clearCart()
        await AsyncStorage.removeItem('Authorization')
    }

    async getToken() : Promise<string | null> {
        const value = await AsyncStorage.getItem('Authorization')
        
        return value
    }

    async addCart(book: Book) {
        return Service.postWithDelay('/user/cart', book)
    }

    async fetchCart() {
        return Service.getWithDelay('/user/cart')
    }

    async removeCart(book: Book) {
        return Service.deleteWithDelay('/user/cart', book)
    }

}

export default new UserService()