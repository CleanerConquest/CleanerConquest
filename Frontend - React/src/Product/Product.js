

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ProductDialog from './ProductDialog';

export default class Product extends React.Component {
    constructor(props) {
        document.title = "Product"
        super(props);
        this.state = {
            products: [],
            product: this.emptyProduct,
            selectedProducts: [],
            globalFilter: null,
            submitted: false,
            productDialog: false,
            deleteProductsDialog: false,
            deleteProductDialog: false,
        };
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

    }

    render() {
        return (
            <div className='divContainer'>
                <ProductDialog visible={this.state.productDialog} onHide={this.hideProductDialog} product={this.state.product} />
                <div className='card'>
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate} />
                    <DataTable ref={(e) => (this.dataTable = e)}
                        value={this.state.products}
                        selection={this.state.selectedProducts}
                        onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Products"
                        globalFilter={this.state.globalFilter}
                        header={this.header}>

                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="category" header=" Category " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="image" header="Image " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="description" header="Description " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="price" header="Price" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="productUnit" header="Product Unit" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="priceUnit" header="Price Unit " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                    </DataTable>
                </div>
            </div>
        );
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
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </div>
        );
    };

    openNew = () => {
        this.emptyProduct.id = this.emptyProduct.id + 1;
        this.setState({
            product: JSON.parse(JSON.stringify(this.emptyProduct)),
            submitted: false,
            productDialog: true,
        })
    };

    confirmDeleteSelected = () => {
        this.setState({ deleteProductsDialog: true })
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

    editProduct = (product) => {
        this.setState({
            product: product,
            productDialog: true,
        })
    };

    confirmDeleteProduct = (product) => {
        this.setState({
            product: product,
            deleteProductDialog: true,
        })
    };

    hideProductDialog = () => {
        this.setState({ productDialog: !this.state.productDialog })
    }
}


