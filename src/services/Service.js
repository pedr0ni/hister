import axios from 'axios'
import Messager from '../components/Messager'

const instance = axios.create({
    baseURL: __DEV__ ? 'http://192.168.0.105:3000' : 'https://hister-api.herokuapp.com',
    timeout: 10000
})

const handleError = (error) => {
    if (error.response) {
        Messager.show('❌', error.response.data.message, 5000, 'danger')
    } else {
        Messager.show('❌', 'Ocorreu um erro de conexão.', 5000, 'danger')
    }
}

const delay = __DEV__ ? 2000 : 0

instance.getWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.get(path)
                .then(response => resolve(response))
                .catch(error => {
                    handleError(error)
                    
                    resolve(undefined)
                })
        }, delay)
    })
}

instance.deleteWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.delete(path)
                .then(response => resolve(response))
                .catch(error => {
                    handleError(error)
                    
                    resolve(undefined)
                })
        }, delay)
    })
}

instance.postWithDelay = (path, body) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.post(path, body)
                .then(response => resolve(response))
                .catch(error => {
                    handleError(error)
                    
                    resolve(undefined)
                })
        }, delay)
    })
}

export default instance 

export class BaseService {

    listAll() {}

}