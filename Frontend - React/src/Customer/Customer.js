

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CustomerDialog from './CustomerDialog';

export default class Customer extends React.Component {
    constructor(props) {
        document.title = "Customers"
        super(props);
        this.state = {
            customers: [],
            customer: this.emptyCustomer,
            selectedCustomers: [],
            globalFilter: null,
            submitted: false,
            customerDialog: false,
            deleteCustomersDialog: false,
            deleteCustomerDialog: false,
        };
    }
    emptyCustomer = {
        id: 1,
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
                <CustomerDialog visible={this.state.customerDialog} onHide={this.hideCustomerDialog} customer={this.state.customer} />
                <div className='card'>
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate} />
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
                        <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>
                        <Column field="firstName" header="First Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="lastName" header="Last Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="phoneNumber" header="Phone Number" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="emailAddress" header="Email Address" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="address" header="Address" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                    </DataTable>
                </div>
            </div>
        );
    }

    loadData=()=>{
       // this.setState 
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
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedCustomers || !this.state.selectedCustomers.length} />
            </div>
        );
    };

    openNew = () => {
        this.emptyCustomer.id = this.emptyCustomer.id + 1;
        this.setState({
            customer: JSON.parse(JSON.stringify(this.emptyCustomer)),
            submitted: false,
            customerDialog: true,
        })
    };

    confirmDeleteSelected = () => {
        this.setState({ deleteCustomersDialog: true })
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" style={{width:'3rem'}} onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" style={{width:'3rem'}} onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    editProduct = (customer) => {
        this.setState({
            customer: customer,
            customerDialog: true,
        })
    };

    confirmDeleteProduct = (customer) => {
        this.setState({
            customer: customer,
            deleteCustomerDialog: true,
        })
    };

    hideCustomerDialog = () => {
        this.setState({ customerDialog: !this.state.customerDialog })
    }
}


