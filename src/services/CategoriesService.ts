import Service, { BaseService } from './Service'

class CategoriesService extends BaseService {

    listAll() {
        return Service.getWithDelay('/category')
    }

}

export default new CategoriesService()