

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OrderService } from '../Service/OrderService';
import Loading from '../Components/Loading';
import Swal from 'sweetalert2';
import OrderDialog from './OrderDialog';

const $ = window.$

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orders: [],
            order: this.emptyOrder,
            selectedOrders: [],
            globalFilter: null,
            orderDialog: false,
            edit: 0,
            expandedRows: null,
        };
        this.orderService = new OrderService()
    }
    emptyOrder = {
        id: 0,
        name: '',
        orderStatus: '',
        createdAT: '',
        estimated: '',
        finishedAt: '',
        productsIDs: [],
        productsQuantities: [],
        worker: '',
        customerId: '',
        price: '',
        discount: '',
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
                <OrderDialog visible={this.state.orderDialog} onHide={this.hideOrderDialog} service={this.orderService} refresh={this.loadData} />

                {this.state.loading ? <Loading /> :
                    <div className='card'>
                        <Toolbar className="mb-4" left={this.leftToolbarTemplate()} right={this.rightToolbarTemplate} />
                        <DataTable ref={(e) => (this.dataTable = e)}
                            expandedRows={this.state.expandedRows}
                            onRowToggle={this.handleRowToggle}
                            rowExpansionTemplate={this.rowExpansionTemplate}
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
                            <Column expander style={{ width: '5rem' }} />
                            <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="orderStatus" header=" Status " sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="createdAT" header="Time Created " body={this.getCreated} sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="estimated" body={this.getEstimated} header="Esimated Time" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="finishedAt" header="Finished At" body={this.getFinished} sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="worker" body={this.getWorker} header=" Worker" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="customer" body={this.getCustomer} header=" Customer" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="price" header=" Price" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="discount" header=" Discount" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                        </DataTable>
                    </div>
                    /*
                     <Column field="productsIDs" header="Products" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="productsQuantities" header="Products Quantities" sortable style={{ minWidth: '12rem' }}></Column>
                    */
                }
            </div>
        );
    }
    getWorker = (order) => {
        return order.worker.firstName + ' ' + order.worker.lastName;
    }
    getCustomer = (order) => {
        return order.customer.firstName + ' ' + order.customer.lastName;
    }
    getCreated = (order) => {
        return order.createdAT.split('T')[0]
    }
    getEstimated = (order) => {
        return order.estimated.split('T')[0]
    }
    getFinished = (order) => {
        if (order.finishedAt !== null)
            return order.finishedAt.split('T')[0]
        else return 'Still In Progress'
    }
    rowExpansionTemplate = (order) => {
        for (let i = 0; i < order.products.length; i++) {
            order.products[i].quantity = order.productsQuantities[i]
        }
        return (
            <div className='p-3'>
                <h5>Products For Order : {order.name}</h5>

                <DataTable value={order.products} >
                    {  /* <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>*/}
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="category" header=" Category " sortable style={{ minWidth: '12rem' }}></Column>
                    {<Column field="image" body={this.createImage} header="Image " sortable style={{ minWidth: '12rem' }}></Column>
                    } <Column field="description" header="Description " sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="price" header="Price" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="productUnit" header="Product Unit" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="priceUnit" header="Price Unit " sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="quantity" header="Product Quantity " sortable style={{ minWidth: '12rem' }}></Column>
                </DataTable>

            </div>
        )
    }
    createImage = (cell) => {
        if (cell.image === '') return
        let link = 'data:image/png;base64,' + cell.image
        return (<div>
            <img src={link} width={150} />
        </div>)
    }


    loadData = () => {
        this.setState({ loading: true })
        let response = this.orderService.getAllOrders();
        response.then(r => {
            if (r.status === 200) {
                this.setState({ orders: r.data })
            }
            else if (r.status === 204) {
                $.WarnToast({ detail: "No Orders Found" })
            }
            else {
                $.ErrorToast({ detail: "Loading Orders Failed" })
            }
        })
        this.setState({ loading: false })
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
            </div>
        );
    };

    openNew = () => {
        this.emptyOrder.id = this.emptyOrder.id + 1;
        this.setState({
            order: JSON.parse(JSON.stringify(this.emptyOrder)),
            orderDialog: true,
            edit: 0,
        })
    };

    rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />;
    };
    handleRowToggle = (event) => {
        this.setState({ expandedRows: event.data })
    }
    exportCSV = () => {
        this.dataTable.exportCSV();
    };

    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" label='Change Status' outlined style={{ width: '7rem' }} className="mr-2" onClick={() => this.editOrder(rowData)} disabled={rowData.orderStatus === 'COMPLETE'} />
            </React.Fragment>
        );
    };

    editOrder = (order) => {
        let nextStatus = this.nextStatus(order)
        Swal.fire({
            title: 'Are you sure about Updating Order Status ?',
            text: " You're about to change order status from " + order.orderStatus + " to " + nextStatus,
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
        }).then((result) => {
            if (result.isConfirmed) {

                let response = this.orderService.updateOrderStatus(order.id)
                response.then(r => {
                    if (r.status === 200) {
                        Swal.fire(
                            'Updated!',
                            ' Order Status have been Succesfully Updated.',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Updating Order Status Failed!',
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
                    'Your Order Status Didnt Change',
                    'error'
                )
            }
        })


    };
    nextStatus = (order) => {
        if (order.orderStatus === 'WAITING') return 'IN_TREATMENT'
        else return 'COMPLETE'
    }


    hideOrderDialog = () => {
        this.setState({ orderDialog: !this.state.orderDialog })
    }
}


