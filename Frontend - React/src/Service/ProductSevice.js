import axios from 'axios'

const $ = window.$

export class ProductService {

    addNewProduct(data) {
        return axios.post($.url + 'customer/save', data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    editProduct(data) {
        return axios.post($.url + 'customer/save', data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    getAllProducts() {
        return axios.get($.url + 'product/', $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProducts(data) {
        return axios.delete($.url + 'product/deleteById', { data: data, headers: $.config().headers })
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }
}