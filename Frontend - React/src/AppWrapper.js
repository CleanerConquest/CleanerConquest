import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from "./App";
import Login from "./pages/Login";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Access from "./pages/Access";

import { Toast } from 'primereact/toast'
import Loading from './Components/Loading';

const $ = window.$;

class AppWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
		//	loadingURL: true
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}
	componentDidMount = () => {
	//	this.loadURL()
	}/*
	loadURL = () => {
		if (window.ENV.Backend_URL) {
			window.$.url = window.ENV.Backend_URL
			window.$.frontendPath = window.ENV.Frontend_Path
			this.setState({ loadingURL: false })
		}
		else {
			setTimeout(this.loadURL(), 500)
		}
	}*/
	getRoutes = () => {
		//return <App />
		console.log("this.props.location.pathname")
		console.log(this.props.location.pathname)
		switch (this.props.location.pathname) {
			case "/login":
				return <Route path="/login" component={Login} />
			case "/error":
				return <Route path="/error" component={Error} />
			case "/404":
				return <Route path="/404" component={NotFound} />
			case "/accessdenied":
				return <Route path="/accessdenied" component={Access} />
			default:
				return <App />
		}
	}

	render() {
		return (
			this.state.loadingURL ? <Loading /> :
				<div>
					<Toast ref={(el) => $.toast = el} position="top-left" />
					{this.getRoutes()}
				</div>
		)
	}
}

export default withRouter(AppWrapper);