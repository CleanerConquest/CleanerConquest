import axios from 'axios'

const $ = window.$


export class AuthService {
    loadProfile(id, self) {

        return axios.get($.url + 'api/users/' + id + "/false", $.config())
            .then(response => {
                if (response.data && response.data.length === 1) {
                    var data = response.data[0]
                    if (localStorage.getItem("login")) {
                        $.SuccessToast({ detail: "تمت عملية تسجيل الدخول بنجاح" })
                        localStorage.removeItem("login")
                    }
                    $.permissions = data.permissions ? data.permissions.map(perm => { return perm.permissionCode }) || [] : []
                    $.uName = data.name
                    $.uCode = data.code
                    self.setState({ name: data.name, role: data.roleName, permissions: $.permissions }, () => self.createMenu())
                }
                else {
                    $.ErrorToast({ detail: "هذا المستخدم غير موجود، يرجى اعادة تسجيل الدخول" })
                    localStorage.clear()
                    if (self.props.location.pathname !== "/login")
                        self.props.history.push("/login")
                }
            })
            .catch(error => {
                $.ErrorToast({ detail: "فشلت عملية احضار بيانات المستخدم، حصل خلل ما\n" + error })
                localStorage.clear()
                if (self.props.location.pathname !== "/login")
                    self.props.history.push("/login")
                console.log(error)
            })
    }

    logout(self) {
        var er = null
        return axios.post($.url + 'api/auth/logout', { UserId: localStorage.getItem("userId") }, $.config())
            .then(response => {
                if (response.data.message === "Failed")
                    er = "logout failed"
                else {
                    localStorage.clear()
                    self.props.history.push("/login")
                }
            })
            .catch(error => {
                er = error
            })
            .then(() => {
                if (er) {
                    $.ErrorToast({ detail: "فشلت عملية تسجيل الخروج\n" + er })
                }
            })
    }

    login(body, self) {
        console.log(body)
        return axios.post($.url + 'auth/signin', body, $.config())
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    //localStorage.setItem("token", response.headers.get('set-cookie'))
                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("userId", response.data.id)
                    $.toast.clear()
                    self.props.history.push("/")
                }
                else{
                    $.ErrorToast({ detail: " Login Failed "})
                }
              
            })
            .catch(error => {
                $.ErrorToast({ detail: "  Login Failed , Error :\n" + error })
                console.log(error)
            })
    }
}