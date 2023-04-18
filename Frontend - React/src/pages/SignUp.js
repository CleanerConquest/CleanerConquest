import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { sha1 } from 'object-hash'
import { AuthService } from '../Service/AuthService'
import Swal from 'sweetalert2'
import { IoIosGlobe } from 'react-icons/io';
import { FiPhoneCall } from 'react-icons/fi';
import { FaFax } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';


const $ = window.$



export default class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
            txtUsername: "",
            txtPassword: "",
            txtEmail: "",
            role: {},
        }

        this.authService = new AuthService()
    }

    _handleKeyDown(event) {

        if (event.keyCode === 13) {
            this.login();
        }

    }


    componentDidMount() {

        this.adminPasswordHandle = this._handleKeyDown.bind(this);
        document.addEventListener('keydown', this.adminPasswordHandle)

    }

    SignUp = () => {
        console.log(this.state.role)
        let selectedRole = []
        selectedRole.push(this.state.role.code)
        if (this.state.txtUsername !== "" && this.state.txtPassword !== "" && this.state.txtEmail !== "" && this.state.role !== {}) {
            var password = this.state.txtPassword
            var body = {
                username: this.state.txtUsername,
                email: this.state.txtEmail,
                role: selectedRole,
                password: password,
            }

            let response = this.authService.signup(body)
            if (response.status === 200) {
                this.setState({
                    checked: false,
                    txtUsername: "",
                    txtPassword: "",
                    txtEmail: "",
                    role: {},
                })
                Swal.fire({
                    title: "User Created Successfully",
                    text: "New User Can Now Access System With Given Credintials",
                    icon: "success"

                })
            }

        }
        else {
            $.ErrorToast({ detail: "We Cant Accept Empty Values, try again" })
        }
    }

    render() {
        const roles = [
            { name: 'User', code: '""' },
            { name: 'Admin', code: 'admin' },
            { name: 'Moderator', code: 'mod' },
        ];
        return (
            <div className="login-body">
                <div className="card loginCard">
                    <img src="assets/layout/images/Cleaner Conquest Logo.png" alt="Cleaner Conquest" className="loginLogoImg" />
                    <h1 className='header'>Create New User</h1>
                    <div className="loginLoginInfoContainer">
                        <div className="loginInputContainer">
                            <label className="loginLblUsername"> Username</label>
                            <div className="login-input">
                                <InputText autoFocus className="loginTxtUsername" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="loginInputContainer">
                            <label className="loginLblUsername"> Email</label>
                            <div className="login-input">
                                <InputText autoFocus className="loginTxtUsername" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="loginInputContainer">
                            <label className="loginLblUsername"> Role</label>
                            <div className="login-input">
                                <Dropdown value={this.state.role} onChange={(e) => { this.setState({ role: e.value }) }} options={roles} optionLabel="name"
                                    placeholder="Select User Role" className="loginTxtUsername h-3rem " />
                            </div>
                        </div>

                        <div className="loginInputContainer">
                            <label className="loginLblUsername"> Password</label>
                            <div className="login-input">
                                <Password className="loginTxtUsername" value={this.state.txtPassword} onChange={(e) => this.setState({ txtPassword: e.target.value })} />
                            </div>
                        </div>

                        <Button className="loginBtnLogin" label="Sign Up " onClick={this.SignUp} />
                    </div>

                    <div className="login-footer-content">
                        <label className="login-footer-isco-name"> Cleaner Conquest 2023, All Rights Reserved.</label>


                    </div>
                </div>
            </div>
        )
    }

}


