

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import OrderDialog from './OrderDialog';

export default class Order extends React.Component {
    constructor(props) {
        document.title = "Order"
        super(props);
        this.state = {
            orders: [],
            customer: this.emptyOrder,
            selectedOrders: [],
            globalFilter: null,
            submitted: false,
            orderDialog: false,
            deleteOrdersDialog: false,
            deleteOrderDialog: false,
        };
    }
    emptyOrder = {
        id: 1,
        name: '',
        orderStatus: '',
        createdAT: '',
        estimated: '',
        finishedAt: '',
        products: [],
        productsQuantities: [],
        worker: '',
        customer: '',
        price: '',
        discount: '',
    };

    componentDidMount() {
        this.setInitialState()
    }

    setInitialState = async () => {

    }

    render() {
        return (
            <div className='divContainer'>
                <OrderDialog visible={this.state.orderDialog} onHide={this.hideOrderDialog} order={this.state.order} />
                <div className='card'>
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate} />
                    <DataTable ref={(e) => (this.dataTable = e)}
                        value={this.state.orders}
                        selection={this.state.selectedOrders}
                        onSelectionChange={(e) => this.setState({ selectedOrders: e.value })}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Orders"
                        globalFilter={this.state.globalFilter}
                        header={this.header}>

                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="orderStatus" header=" Status " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="createdAT" header="Time Created " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="estimated" header="Esimated Time" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="finishedAt" header="Finished At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="products" header="Products" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="productsQuantities" header="Products Quantities" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="worker" header=" Worker" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="customer" header=" Customer" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="price" header=" Price" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="discount" header=" Discount" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                    </DataTable>
                </div>
            </div>
        );
    }

    header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">All Orders</h4>
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
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedOrders || !this.state.selectedOrders.length} />
            </div>
        );
    };

    openNew = () => {
        this.emptyOrder.id = this.emptyOrder.id + 1;
        this.setState({
            order: JSON.parse(JSON.stringify(this.emptyOrder)),
            submitted: false,
            orderDialog: true,
        })
    };

    confirmDeleteSelected = () => {
        this.setState({ deleteOrdersDialog: true })
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    editProduct = (order) => {
        this.setState({
            order: order,
            orderDialog: true,
        })
    };

    confirmDeleteProduct = (order) => {
        this.setState({
            order: order,
            deleteOrderDialog: true,
        })
    };

    hideOrderDialog = () => {
        this.setState({ orderDialog: !this.state.orderDialog })
    }
}


