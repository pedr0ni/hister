import Service, { BaseService } from './Service'
import authenticationConfig from '../config/authentication.json'
import { AsyncStorage } from 'react-native'
import CartService from './CartService'

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

}

export default new UserService()