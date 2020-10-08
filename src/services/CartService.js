import { AsyncStorage } from 'react-native'
import Service, { BaseService } from './Service'

const TAG = 'CartStorage'

class CartService extends BaseService {

    constructor() {
        super()
        this.configure()
    }

    async getCart() {
        const item = await AsyncStorage.getItem(TAG)
        if (!item)
            return undefined
        return JSON.parse(await AsyncStorage.getItem(TAG))
    }

    async addItem(book) {
        const cart = await this.getCart()
        cart.push(book)

        await AsyncStorage.setItem(TAG, JSON.stringify(cart))
    }

    async hasItem(book) {
        const cart = await this.getCart()
        return cart.some(b => b._id == book._id)
    }

    async removeItem(book) {
        let cart = await this.getCart()
        cart = cart.filter(c => c._id == book._id)
        
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

export default CartInstance = new CartService()