import axios from 'axios'

const $ = window.$

export class CustomerService {

    editCustomer(data, id) {
        return axios.put($.url + 'customer/update/' + id, data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    addNewCustomer(data) {
        return axios.post($.url + 'customer/save', data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    getCustomerByName(name) {
        return axios.get($.url + 'customer/byName' + name, $.config())
            .then(response => {
                return response
            })
            .catch(error => [console.log(error)])
    }

    getAllCustomers() {
        return axios.get($.url + 'customer/', $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteCustomers(data) {
        return axios.delete($.url + 'customer/deleteById', { data: data, headers: $.config().headers })
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }
}