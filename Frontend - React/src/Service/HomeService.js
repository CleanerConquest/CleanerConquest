import axios from 'axios'

const $ = window.$

export class HomeService {

    getCustomerByName(name) {
        return axios.get($.url + 'customer/byName{name}?name=' + name, $.config())
            .then(response => {
                if (response.status === 200) { { return response } }
                else { $.ErrorToast({ detail: "Get Customer By Name Failed" }) }
            })
            .catch(error => {
                $.ErrorToast({ detail: "  Get Customer By Name Failed , Error :\n" + error })
                console.log(error)
            })
    }
//used
    getCustomerByDate(date) {
        return axios.get($.url + 'customer/countByDate{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
    //////used from here
    sumUnfinishedOrderByDate(date) {
        return axios.get($.url + 'order/sumUnfinishedByDate{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
    sumFinishedOrderByDate(date) {
        return axios.get($.url + 'order/sumFinishedByDate{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
    ///to here
    countUnfinishedOrderByDate(date) {
        return axios.get($.url + 'order/countUnfinished{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
    countOrderByDate(date) {
        return axios.get($.url + 'order/countByDate{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }


    getOrderByName(name) {
        return axios.get($.url + 'order/byName{name}?name=' + name, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
    getWorkerByName(name) {
        return axios.get($.url + 'worker/byName{name}?name=' + name, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }


    getWorkerByDate(date) {
        return axios.get($.url + 'worker/countByDate{date}?date=' + date, $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }

}