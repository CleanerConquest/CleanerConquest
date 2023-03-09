
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default class OrderDialog extends React.Component {
    constructor(props) {
        document.title = "Order Dialog"
        super(props);
        this.state = {
            order:null,
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
            submitted: false,
        };
    }

  

    componentDidUpdate = async (prevProps) => {
        if(this.props.order.id
             !== prevProps.order.id){
        this.setState({
            name: this.props.order.name,
            orderStatus:this.props.order.orderStatus,
            createdAT:this.props.order.createdAT,
            estimated: this.props.order.estimated,
            finishedAt: this.props.order.finishedAt,
            products: this.props.order.products,
            productsQuantities: this.props.order.productsQuantities,
            worker: this.props.order.worker,
            customer: this.props.order.customer,
            price: this.props.order.price,
            discount:this.props.order.discount,
                   })}
    }
    render() {


        return (

            <div>
                <Toast ref={(el) => this.toast = el} />
                <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Order Details" modal className="p-fluid" footer={this.orderDialogFooter} onHide={this.props.onHide}>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Order Name
                        </label>
                        <InputText id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.value })} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.name })} />
                        {this.state.submitted && !this.state.name && <small className="p-error"> Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="orderStatus" className="font-bold">
                        Order Status
                        </label>
                        <InputText id="orderStatus" value={this.state.orderStatus} onChange={(e) => this.setState({ orderStatus: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="createdAT" className="font-bold">
                             Created At
                        </label>
                        <InputText id="createdAT" value={this.state.createdAT} onChange={(e) => this.setState({ createdAT: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="estimated" className="font-bold">
                        Estimated Time
                        </label>
                        <InputText id="estimated" value={this.state.estimated} onChange={(e) => this.setState({ estimated: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="finishedAt" className="font-bold">
                        Finished At
                        </label>
                        <InputText id="finishedAt" value={this.state.finishedAt} onChange={(e) => this.setState({ finishedAt: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="products" className="font-bold">
                        Products
                        </label>
                        <InputText id="products" value={this.state.products} onChange={(e) => this.setState({ products: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="productsQuantities" className="font-bold">
                        Products Quantities
                        </label>
                        <InputText id="productsQuantities" value={this.state.productsQuantities} onChange={(e) => this.setState({ productsQuantities: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="worker" className="font-bold">
                       Worker
                        </label>
                        <InputText id="worker" value={this.state.worker} onChange={(e) => this.setState({ worker: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="customer" className="font-bold">
                        Customer
                        </label>
                        <InputText id="customer" value={this.state.customer} onChange={(e) => this.setState({ customer: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="price" className="font-bold">
                        Price
                        </label>
                        <InputText id="price" value={this.state.price} onChange={(e) => this.setState({ price: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="discount" className="font-bold">
                        Discount
                        </label>
                        <InputText id="discount" value={this.state.discount} onChange={(e) => this.setState({ discount: e.value })} required />
                    </div>
                </Dialog>
            </div>
        );/*
        return (
           
        );*/
    }


   orderDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={this.saveOrder} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveOrder} />
            </React.Fragment>
        );

    }


    saveOrder = () => {
        this.toast.show({ severity: 'warn', summary: 'تم الحذف', detail: 'تمت عملية الحذف', life: 3000 });

        /*

        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);*/
    }
    toast = null;
};







