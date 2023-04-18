
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import Loading from 'react-loading';
import Swal from 'sweetalert2';

const $ = window.$

export default class CustomerDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            customer: null,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            address: '',
       };
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.customer.id
            !== prevProps.customer.id) {
            this.setState({
                firstName: this.props.customer.firstName,
                lastName: this.props.customer.lastName,
                phoneNumber: this.props.customer.phoneNumber,
                emailAddress: this.props.customer.emailAddress,
                address: this.props.customer.address,
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.loading
                        ? <Loading /> :
                        <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Customer Details" modal className="p-fluid" footer={this.customerDialogFooter} onHide={this.props.onHide}>

                            <div className="field">
                                <label htmlFor="firstName" className="font-bold">
                                    First Name
                                </label>
                                <InputText id="firstName" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} required autoFocus className={classNames({ 'p-invalid': !this.state.firstName })} />
                                { !this.state.firstName && <small className="p-error">First Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="lastName" className="font-bold">
                                    Last Name
                                </label>
                                <InputText id="lastName" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="phoneNumber" className="font-bold">
                                    Phone Number
                                </label>
                                <InputText id="phoneNumber" value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="emailAddress" className="font-bold">
                                    Email Address
                                </label>
                                <InputText id="emailAddress" value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="address" className="font-bold">
                                    Address
                                </label>
                                <InputText id="address" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} required />
                            </div>
                        </Dialog>
                }
            </div>
        );
    }


    customerDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={() => this.props.onHide()} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveCustomer} />
            </React.Fragment>
        );

    }


    saveCustomer = () => {
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.emailAddress === '' || this.state.phoneNumber === '' || this.state.address === '') {
            $.ErrorToast({ detail: "Please Fill All Details" })
            return
        }
        this.setState({ loading: true })

        let { firstName, lastName, emailAddress, phoneNumber, address } = this.state
        let data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            address: address
        }

        if (this.props.type === 0) {
            Swal.fire({
                title: 'Are you sure about Adding a new customer ?',
                text: "Username : " + this.state.firstName + ' ' + this.state.lastName,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Add Him!'
            }).then((result) => {
                if (result.isConfirmed) {

                    let response = this.props.service.addNewCustomer(data)
                    response.then(r => {
                        if (r.status === 200) {
                            Swal.fire(
                                'Added!',
                                'This Customer has been Succesfully Added.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Adding Customer Failed!',
                                'Something went wrong',
                                'error'
                            )
                        }
                    })
                }
            })
        }
        else {
            Swal.fire({
                title: 'Are you sure about updating this customer details ?',
                text: "Username : " + this.props.customer.firstName + ' ' + this.props.customer.lastName,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let id = this.props.customer.id
                    let response = this.props.service.editCustomer(data, id)
                    response.then(r => {
                        if (r.status === 200) {
                       
                            Swal.fire(
                                'Updated!',
                                'This Customer has been Succesfully Updated.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Updating Customer Failed!',
                                'Something went wrong',
                                'error'
                            )
                        }
                    })

                }
            })

        }
        this.setState({ loading: false })

    }
};







