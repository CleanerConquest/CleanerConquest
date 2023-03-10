import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { sha1 } from 'object-hash'
import { AuthService } from '../Service/AuthService'
import Swal from 'sweetalert2'
const $ = window.$



export default class Login extends Component {

	constructor() {
		super();
		document.title = "Login "
		this.state = {
			checked: false,
			txtUsername: "",
			txtPassword: "",
		}

		this.authService = new AuthService()
	}
	
	componentDidMount() {
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
				<div className="card login-panel ui-fluid">
					<div className="login-panel-content">
						<div className="p-grid">
							<div className="p-col-12 p-sm-6 p-md-6 logo-container" >
								<img src="../../Cleaner Conquest Logo.png" alt="Cleaner Conquest Logo" style={{width:'250px',height:'250px'}}/>
								<span className="guest-sign-in">Your Conquest is waiting, Login to start</span>
							</div>
							<div className="p-col-12 username-container">
								<label> User Name</label>
								<div className="login-input">
									<InputText autoFocus className="loginTxtUsername" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
								</div>
							</div>
							<div className="p-col-12 password-container">
								<label>Password </label>
								<div className="login-input">
									<Password className="loginTxtUsername" value={this.state.txtPassword} onChange={(e) => this.setState({ txtPassword: e.target.value })} />
								</div>
							</div>

							<div className="p-col-12 p-sm-6 p-md-6">
								<Button className="loginBtnLogin" label="Login" icon="pi pi-user" iconPos="left" onClick={() => { this.login() }} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

