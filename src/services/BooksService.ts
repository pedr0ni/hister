import { Category } from '../models/Category'
import Service, { BaseService } from './Service'

class BooksService extends BaseService {

    listAll() {
        return Service.getWithDelay('/books')
    }

    listByCategory(category: Category, page: number) {
        return Service.getWithDelay(`/book/category/${category}?page=${page}`)
    }

}

export default new BooksService()