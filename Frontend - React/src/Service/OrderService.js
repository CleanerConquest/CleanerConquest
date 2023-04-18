import axios from 'axios'

const $ = window.$

export class OrderService {

    addNewOrder(data) {
        return axios.post($.url + 'order/save', data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    updateOrderStatus(id) {
        return axios.get($.url + 'order/updateStatus{id}?id=' + id, $.config())
            .then(response => { return response })
            .catch(error => { console.log(error) })
    }

    getAllOrders() {
        return axios.get($.url + 'order/', $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
}