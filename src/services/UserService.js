import Service, { BaseService } from './Service'
import authenticationConfig from '../config/authentication.json'
import { AsyncStorage } from 'react-native'

class UserService extends BaseService {

    constructor() {
        super()
        this.loadToken()
    }

    async loadToken() {
        const token = await this.getToken()
        if (token)
            Service.defaults.headers = {
                Authorization: `Bearer ${token}`
            }
    }

    authenticate(body) {
        return Service.postWithDelay('/user/authenticate', body)
    }

    register(body) {
        return Service.postWithDelay('/user/register', body)
    }

    info () {
        return Service.getWithDelay('/user/info')
    }

    async setToken(token) {
        await AsyncStorage.setItem('Authorization', token)
        Service.defaults.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    async logout() {
        await AsyncStorage.removeItem('Authorization')
    }

    async getToken() {
        const value = await AsyncStorage.getItem('Authorization')
        
        return value
    }

}

export default UserInstance = new UserService()