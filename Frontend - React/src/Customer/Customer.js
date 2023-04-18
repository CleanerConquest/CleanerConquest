

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CustomerDialog from './CustomerDialog';
import Loading from '../Components/Loading';
import { CustomerService } from '../Service/CustomerService';
import Swal from 'sweetalert2';
const $ = window.$

export default class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            customers: [],
            customer: this.emptyCustomer,
            selectedCustomers: [],
            globalFilter: null,
            customerDialog: false,
            edit: 0,
        };

        this.customerService = new CustomerService()
    }

    emptyCustomer = {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        address: '',
    };

    componentDidMount() {
        this.setInitialState()
    }

    setInitialState = async () => {
        this.loadData()
    }

    render() {
        return (
            <div className='divContainer'>
                <CustomerDialog visible={this.state.customerDialog} onHide={this.hideCustomerDialog} customer={this.state.customer} type={this.state.edit} service={this.customerService} refresh={this.loadData} />
                {this.state.loading ?
                    <Loading />
                    :
                    <div className='card'>
                        <Toolbar className="mb-4" left={this.leftToolbarTemplate()} right={this.rightToolbarTemplate} />
                        <DataTable ref={(e) => (this.dataTable = e)}
                            value={this.state.customers}
                            selection={this.state.selectedCustomers}
                            onSelectionChange={(e) => this.setState({ selectedCustomers: e.value })}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
                            globalFilter={this.state.globalFilter}
                            header={this.header}>

                            <Column selectionMode="multiple" exportable={false}></Column>
                            <Column field="firstName" header="First Name" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="lastName" header="Last Name" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="phoneNumber" header="Phone Number" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="emailAddress" header="Email Address" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="address" header="Address" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                        </DataTable>
                    </div>
                }
            </div>
        );
    }

    loadData = () => {
        this.setState({ loading: true })
        let response = this.customerService.getAllCustomers();
        response.then(r => {
            if (r.status === 200) {
                this.setState({ customers: r.data })
            }
            else if (r.status === 204) {
                $.WarnToast({ detail: "No Customers Found" })
            }
            else {
                $.ErrorToast({ detail: "Loading Customers Failed" })
            }
        })
        this.setState({ loading: false })
    }

    header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">All Customers</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        )
    }

    leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.GetSelectedCustomers} disabled={this.state.selectedCustomers && !this.state.selectedCustomers.length > 0} />
            </div>
        );
    };

    openNew = () => {
        this.emptyCustomer.id = this.emptyCustomer.id + 1;
        this.setState({
            customer: JSON.parse(JSON.stringify(this.emptyCustomer)),
            customerDialog: true,
            edit: 0,
        })
    };

    rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />;
    };

    exportCSV = () => {
        this.dataTable.exportCSV();
    };

    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" style={{ width: '3rem' }} onClick={() => this.editCustomer(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" style={{ width: '3rem' }} onClick={() => this.GetSelectedCustomer(rowData)} />
            </React.Fragment>
        );
    };

    editCustomer = (customer) => {
        this.setState({
            customer: customer,
            customerDialog: true,
            edit: 1
        })
    };

    GetSelectedCustomers = () => {
        let ids = this.state.selectedCustomers.map(e => e.id)
        this.deleteCustomers(ids)
    };

    GetSelectedCustomer = (customer) => {
        let ids = []
        ids.push(customer.id)
        this.deleteCustomers(ids)
    };

    deleteCustomers = (ids) => {
        let idsJSON = new Object();
        idsJSON.ids = ids
        let idsJSONString = JSON.stringify(idsJSON)
        Swal.fire({
            title: 'Are you sure about Deleting customers ?',
            text: " You're about to delete " + ids.length + " customers",
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {

                let response = this.customerService.deleteCustomers(idsJSONString)
                response.then(r => {
                    if (r.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            ' Customers have been Succesfully Deleted.',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Deleting Customers Failed!',
                            'Something went wrong',
                            'error'
                        )
                    }
                    this.loadData()
                })
            }
            else {
                Swal.fire(
                    'Cancelled',
                    'Your Customers  is safe',
                    'error'
                )
            }
        })
    }

    hideCustomerDialog = () => {
        this.setState({ customerDialog: !this.state.customerDialog })
    }
}


