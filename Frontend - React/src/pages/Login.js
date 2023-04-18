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

const $ = window.$



export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			checked: false,
			txtUsername: "",
			txtPassword: "",
		}

		this.authService = new AuthService()
	}
	
	_handleKeyDown(event) {

		if(event.keyCode === 13){
				this.login();
		}
			
	}


	componentDidMount() {

		this.adminPasswordHandle = this._handleKeyDown.bind(this);
		document.addEventListener('keydown', this.adminPasswordHandle)

	}

	login = () => {
		if (this.state.txtUsername !== "" && this.state.txtPassword !== "") {
			var password = this.state.txtPassword
			var body = {
				username: this.state.txtUsername,
				password: password
			}

			this.authService.login(body, this)
		}
		else {
			$.ErrorToast({ detail: "Enter Username and Password, and try again" })
		}
	}

	render() {

		return (
			<div className="login-body">
				<div className="card loginCard">
					<img src="assets/layout/images/Cleaner Conquest Logo.png" alt="Cleaner Conquest" className="loginLogoImg" />
					<div className="loginLoginInfoContainer">
						<div className="loginInputContainer">
							<label className="loginLblUsername"> Username</label>
							<div className="login-input">
								<InputText autoFocus className="loginTxtUsername" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
							</div>
						</div>

						<div className="loginInputContainer">
							<label className="loginLblUsername"> Password</label>
							<div className="login-input">
								<Password className="loginTxtUsername" value={this.state.txtPassword} onChange={(e) => this.setState({ txtPassword: e.target.value })} />
							</div>
						</div>

						<Button className="loginBtnLogin" label="Login " onClick={this.login} />
					</div>

					<div className="login-footer-content">
						<label className="login-footer-isco-name"> Cleaner Conquest 2023, All Rights Reserved.</label>
				

					</div>
				</div>
			</div>
		)
		}

	}


