import axios from 'axios'
import {showMessage} from 'react-native-flash-message'

const instance = axios.create({
    baseURL: 'http://192.168.0.105:3000',
    timeout: 1000
})

const handleError = (error) => {
    if (error.response)
        showMessage({
            message: 'Ops',
            description: error.response.data.message,
            type: 'danger',
            duration: 5000
        })
    else
        showMessage({
            message: 'Ops',
            description: 'Ocorreu um erro de conexão.',
            type: 'danger',
            duration: 5000
        })
}

const delay = 2000

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