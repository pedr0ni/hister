import axios, { AxiosError, AxiosResponse } from 'axios'
import Messager from '../components/Messager'

const instance = axios.create({
    baseURL: __DEV__ ? 'http://192.168.0.105:3000' : 'https://hister-api.herokuapp.com',
    timeout: 10000
})

const handleError = (error: AxiosError) => {
    if (error.response) {
        if (error.response.status == 401) {
            // Quebrar app
            return
        }
        Messager.show('❌', error.response.data.message, 5000, 'danger')
    } else {
        Messager.show('❌', 'Ocorreu um erro de conexão.', 5000, 'danger')
    }
}

const delay = __DEV__ ? 2000 : 0

export default {

    getWithDelay: (path: string) : Promise<AxiosResponse> => {
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
    },

    deleteWithDelay: (path: string) : Promise<AxiosResponse> => {
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
    },

    postWithDelay: (path: string, body: object) : Promise<AxiosResponse> => {
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
    },

    axios: instance
}

export class BaseService {

    listAll() {}

}