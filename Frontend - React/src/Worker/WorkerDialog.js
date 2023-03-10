
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default class WorkerDialog extends React.Component {
    constructor(props) {
        document.title = "Worker Dialog"
        super(props);
        this.state = {
            worker:null,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            employedAt: '',
            unemploymentAt: '',
            submitted: false,
        };
    }

  

    componentDidUpdate = async (prevProps) => {
        if(this.props.worker.id
             !== prevProps.worker.id){
        this.setState({
            firstName:this.props.worker.firstName,
            lastName: this.props.worker.lastName,
            phoneNumber: this.props.worker.phoneNumber,
            address: this.props.worker.address,
            employedAt: this.props.worker.employedAt,
            unemploymentAt: this.props.worker.unemploymentAt,
                   })}
    }
    render() {


        return (

            <div>
                <Toast ref={(el) => this.toast = el} />
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
                        <InputText id="employedAt" value={this.state.employedAt} onChange={(e) => this.setState({ employedAt: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="unemploymentAt" className="font-bold">
                        Unemployment At
                        </label>
                        <InputText id="unemploymentAt" value={this.state.unemploymentAt} onChange={(e) => this.setState({ unemploymentAt: e.value })} required />
                    </div>
                </Dialog>
            </div>
        );/*
        return (
           
        );*/
    }


   workerDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={this.saveWorker} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveWorker} />
            </React.Fragment>
        );

    }


    saveWorker= () => {
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







