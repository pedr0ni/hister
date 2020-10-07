import Service, { BaseService } from './Service'

class BooksService extends BaseService {

    listAll() {
        return Service.getWithDelay('/books')
    }

    listByCategory(category, page) {
        return Service.getWithDelay(`/book/category/${category}?page=${page}`)
    }

}

export default BooksInstance = new BooksService()