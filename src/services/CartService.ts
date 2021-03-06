import { AsyncStorage } from 'react-native'
import { Book } from '../models/Book'
import Service, { BaseService } from './Service'
import UserService from './UserService'

const TAG = 'CartStorage'

class CartService extends BaseService {

    constructor() {
        super()
        this.configure()
    }

    placeOrder(books: Array<Book>) {
        return Service.postWithDelay('/order', books)
    }

    async getCart() : Promise<Array<Book>> {
        const item = await AsyncStorage.getItem(TAG)
        return JSON.parse(item!!)
    }

    async addItem(book: Book) {
        const cart = await this.getCart()
        cart.push(book)

        await AsyncStorage.setItem(TAG, JSON.stringify(cart))
    }

    async setBooks(books: Array<Book>) {
        await AsyncStorage.setItem(TAG, JSON.stringify(books))
    }

    async hasItem(book: Book) : Promise<boolean> {
        const cart = await this.getCart()
        return cart.some(b => b._id == book._id)
    }

    async removeItem(book: Book) {
        let cart = await this.getCart()
        cart = cart.filter(c => c._id != book._id)
        
        await AsyncStorage.setItem(TAG, JSON.stringify(cart))
    }

    async clearCart() {
        await AsyncStorage.setItem(TAG, JSON.stringify([]))
    }

    async configure() {
        const cart = await this.getCart()

        if (!cart)
            this.clearCart()
    }

}

export default new CartService()