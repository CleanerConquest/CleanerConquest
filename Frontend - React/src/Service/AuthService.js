import axios from 'axios'

const $ = window.$


export class AuthService {

    signup(body) {
        axios.post($.url + 'api/auth/signup', body, $.config())
            .then(response => {
                if (response.status === 200) { { return response } }
                else { $.ErrorToast({ detail: "SignUp Failed" }) }
            })
            .catch(error => {
                $.ErrorToast({ detail: "  SignUp Failed , Error :\n" + error })
                console.log(error)
            })
    }

    logout(self) {
        axios.post($.url + 'api/auth/signout', "", $.config())
        localStorage.clear();
        $.toast.clear()
        self.props.history.push("/login")
    }

    login(body, self) {
        return axios.post($.url + 'api/auth/signin', body, $.config())
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("refershToken", response.data.refreshToken)
                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("userId", response.data.id)
                    localStorage.setItem("role", response.data.roles[0])
                    $.toast.clear()
                    self.props.history.push("/")
                }
                else {
                    $.ErrorToast({ detail: " Login Failed " })
                }

            })
            .catch(error => {
                $.ErrorToast({ detail: "  Login Failed , Error :\n" + error })
                console.log(error)
            })
    }

    //Zaid Come Here
    //Create Refresh Token
    checkToRefersh(self) {
        return axios.get($.url + 'customer/', $.config())
            .then(response => {
                return response
            })
            .catch(error => {
                return axios.post($.url + 'api/auth/refreshtoken', localStorage.getItem('refershToken'), $.config())
                    .then(response => {
                        localStorage.setItem("token", response.data.refreshToken)
                    })
                    .catch(error => {
                        $.ErrorToast({ detail: "  Session Timed Out  , Please Login Again :" })
                        self.props.history.push("/login")
                    })
            })
    }
}