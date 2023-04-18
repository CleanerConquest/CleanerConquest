

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Loading from '../Components/Loading';
import ProductDialog from './ProductDialog';
import { ProductService } from '../Service/ProductSevice';
import Swal from 'sweetalert2';
const $ = window.$
export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            product: this.emptyProduct,
            selectedProducts: [],
            globalFilter: null,
            productDialog: false,
            edit: 0,
        };
        this.productService = new ProductService()
    }
    emptyProduct = {
        id: 1,
        name: '',
        category: '',
        image: '',
        description: '',
        price: '',
        productUnit: '',
        priceUnit: '',
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
                <ProductDialog visible={this.state.productDialog} onHide={this.hideProductDialog} product={this.state.product} type={this.state.edit} service={this.productService} refresh={this.loadData} />
                {
                    this.state.loading ? <Loading /> :
                        <div className='card'>
                            <Toolbar className="mb-4" left={this.leftToolbarTemplate()} right={this.rightToolbarTemplate()} />
                            <DataTable ref={(e) => (this.dataTable = e)}
                                value={this.state.products}
                                selection={this.state.selectedProducts}
                                onSelectionChange={(e) => this.setState({ selectedProducts: e.value }, () => { console.log(this.state.selectedProducts) })}
                                dataKey="id"
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Products"
                                globalFilter={this.state.globalFilter}
                                header={this.header}>

                                <Column selectionMode="multiple" exportable={false}></Column>
                                {  /* <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>*/}
                                <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="category" header=" Category " sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="image" body={this.createImage} header="Image " sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="description" header="Description " sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="price" header="Price" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="productUnit" header="Product Unit" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="priceUnit" header="Price Unit " sortable style={{ minWidth: '12rem' }}></Column>
                                <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                            </DataTable>
                        </div>
                }
            </div>
        );
    }

    createImage = (cell) => {
        let link = 'data:image/png;base64,' + cell.image
        return (<div>
            <img src={link} width={150} />
        </div>)
    }

    loadData = () => {
        this.setState({ loading: true })
        let response = this.productService.getAllProducts();
        response.then(r => {
            if (r.status === 200) {
                this.setState({ products: r.data })
            }
            else if (r.status === 204) {
                $.WarnToast({ detail: "No Products Found" })
            }
            else {
                $.ErrorToast({ detail: "Loading Products Failed" })
            }
        })
        this.setState({ loading: false })
    }

    header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">All Products</h4>
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
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.GetSelectedProducts} disabled={this.state.selectedProducts && !this.state.selectedProducts.length > 0} />
            </div>
        );
    };

    openNew = () => {
        this.emptyProduct.id = this.emptyProduct.id + 1;
        this.setState({
            product: JSON.parse(JSON.stringify(this.emptyProduct)),
            productDialog: true,
            edit: 0,
        })
    };

    GetSelectedProducts = () => {
        let ids = this.state.selectedProducts.map(e => e.id)
        this.deleteProducts(ids)
    };

    GetSelectedProduct = (product) => {
        let ids = []
        ids.push(product.id)
        this.deleteProducts(ids)
    };

    deleteProducts = (ids) => {
        let idsJSON = new Object();
        idsJSON.ids = ids
        let idsJSONString = JSON.stringify(idsJSON)
        Swal.fire({
            title: 'Are you sure about Deleting products ?',
            text: " You're about to delete " + ids.length + " products",
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {

                let response = this.productService.deleteProducts(idsJSONString)
                response.then(r => {
                    if (r.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            ' Products have been Succesfully Deleted.',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Deleting Products Faild!',
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
                    'Your Products  are safe',
                    'error'
                )
            }
        })
    }

    rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />;
    };

    exportCSV = () => {
        this.dataTable.exportCSV();
    };

    actionBodyTemplate = (rowData) => {
        //  <Button icon="pi pi-pencil" rounded outlined className="mr-2" style={{ width: '3rem' }} onClick={() => this.editProduct(rowData)} />

        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" style={{ width: '3rem' }} onClick={() => this.GetSelectedProduct(rowData)} />
            </React.Fragment>
        );
    };

    editProduct = (product) => {
        this.setState({
            product: product,
            productDialog: true,
            edit: 1
        })
    };


    hideProductDialog = () => {
        this.setState({ productDialog: !this.state.productDialog })
    }
}


