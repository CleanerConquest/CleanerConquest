import axios from 'axios'

const $ = window.$

export class WorkerService {

    editWorker(data, id) {

        return axios.put($.url + 'worker/update/' + id, data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })

    }

    addNewWorker(data) {
        return axios.post($.url + 'worker/save', data, $.config())
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }

    getAllWorkers() {
        return axios.get($.url + 'worker/', $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteWorker(id) {
        return axios.delete($.url + 'worker/unemploy{id}?id=' + id, { headers: $.config().headers })
            .then(response => {
                return response
            })
            .catch(error => { console.log(error) })
    }
}