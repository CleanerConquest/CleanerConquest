
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import Loading from 'react-loading';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import { Calendar } from 'primereact/calendar';

const $ = window.$


export default class WorkerDialog extends React.Component {
    constructor(props) {
        let date = new Date()
        super(props);
        this.state = {
            loading: false,
            worker: null,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            employedAt: '',
            unemploymentAt: '',
        };
    }



    componentDidUpdate = async (prevProps) => {
        if (this.props.worker.id
            !== prevProps.worker.id) {
            this.setState({
                firstName: this.props.worker.firstName,
                lastName: this.props.worker.lastName,
                phoneNumber: this.props.worker.phoneNumber,
                address: this.props.worker.address,
            })
            this.props.type === 0 ? this.setState({ employedAt: moment().format("Do MMM YY") }) : this.setState({ employedAt: this.props.worker.employedAt.split('T')[0] })
            this.props.worker.unemploymentAt === null ? this.setState({ unemploymentAt: 'Still An Employee' }) : this.setState({ unemploymentAt: this.props.worker.unemploymentAt.split('T')[0] })
        }
       

    }
    render() {
        return (
            <div>
                {
                    this.state.loading ? <Loading /> :
                        <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Worker Details" modal className="p-fluid" footer={this.workerDialogFooter} onHide={this.props.onHide}>

                            <div className="field">
                                <label htmlFor="firstName" className="font-bold">
                                    First Name
                                </label>
                                <InputText id="firstName" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.value })} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.firstName })} />
                                {this.state.submitted && !this.state.firstName && <small className="p-error"> First Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="lastName" className="font-bold">
                                    Last Name
                                </label>
                                <InputText id="lastName" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="phoneNumber" className="font-bold">
                                    Phone Number
                                </label>
                                <InputText id="phoneNumber" value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="address" className="font-bold">
                                    Address
                                </label>
                                <InputText id="address" value={this.state.address} onChange={(e) => this.setState({ address: e.value })} required />
                            </div>
                            <div className="field">
                                <label htmlFor="employedAt" className="font-bold">
                                    Employed At
                                </label>
                                <InputText id="employedAt" disabled value={this.state.employedAt} onChange={(e) => this.setState({ employedAt: e.value })} required />
                            </div>
                            {this.props.type === 1 ?
                                <div className="field">
                                    <label htmlFor="unemploymentAt" className="font-bold">
                                        Unemployment At
                                    </label>
                                    <InputText id="unemploymentAt" disabled value={this.state.unemploymentAt} onChange={(e) => this.setState({ unemploymentAt: e.value })} required />
                                </div> : <div></div>
                            }
                        </Dialog>
                }
            </div>
        );
    }


    workerDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={() => this.props.onHide()} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveWorker} />
            </React.Fragment>
        );

    }


    saveWorker = () => {
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.phoneNumber === '' || this.state.address === '' || this.state.employedAt === '') {
            $.ErrorToast({ detail: "Please Fill All Details" })
            return
        }
        this.setState({ loading: true })

        let { firstName, lastName, phoneNumber, address } = this.state
        let data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
        }

        if (this.props.type === 0) {
            Swal.fire({
                title: 'Are you sure about Adding a new Worker ?',
                text: "Username : " + this.state.firstName + ' ' + this.state.lastName,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Add Him!'
            }).then((result) => {
                if (result.isConfirmed) {

                    let response = this.props.service.addNewWorker(data)
                    response.then(r => {
                        if (r.status === 200) {
                            Swal.fire(
                                'Added!',
                                'This Worker has been Succesfully Added.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Adding Worker Failed!',
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
                title: 'Are you sure about updating this worker details ?',
                text: "Username : " + this.props.worker.firstName + ' ' + this.props.worker.lastName,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let id = this.props.worker.id
                    let response = this.props.service.editWorker(data, id)
                    response.then(r => {
                        if (r.status === 200) {

                            Swal.fire(
                                'Updated!',
                                'This Worker Details has been Succesfully Updated.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Updating Worker Failed!',
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







