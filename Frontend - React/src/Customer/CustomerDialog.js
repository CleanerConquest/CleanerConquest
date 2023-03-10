
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default class CustomerDialog extends React.Component {
    constructor(props) {
        document.title = "Customer Dialog"
        super(props);
        this.state = {
            customer:null,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            address: '',
            submitted: false,
        };
    }

  

    componentDidUpdate = async (prevProps) => {
        if(this.props.customer.id
             !== prevProps.customer.id){
        this.setState({
            firstName: this.props.customer.firstName,
            lastName: this.props.customer.lastName,
            phoneNumber: this.props.customer.phoneNumber,
            emailAddress: this.props.customer.emailAddress,
            address: this.props.customer.address,        })}
    }
    render() {


        return (

            <div>
                <Toast ref={(el) => this.toast = el} />
                <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Customer Details" modal className="p-fluid" footer={this.customerDialogFooter} onHide={this.props.onHide}>

                    <div className="field">
                        <label htmlFor="firstName" className="font-bold">
                            First Name
                        </label>
                        <InputText id="firstName" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.value })} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.firstName })} />
                        {this.state.submitted && !this.state.firstName && <small className="p-error">First Name is required.</small>}
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
                        <label htmlFor="emailAddress" className="font-bold">
                            Email Address
                        </label>
                        <InputText id="emailAddress" value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="address" className="font-bold">
                            Address
                        </label>
                        <InputText id="address" value={this.state.address} onChange={(e) => this.setState({ address: e.value })} required />
                    </div>
                </Dialog>
            </div>
        );/*
        return (
           
        );*/
    }


    customerDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={this.saveCustomer} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveCustomer} />
            </React.Fragment>
        );

    }


    saveCustomer = () => {
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







