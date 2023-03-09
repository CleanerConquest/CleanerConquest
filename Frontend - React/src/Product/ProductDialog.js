
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default class ProductDialog extends React.Component {
    constructor(props) {
        document.title = "Product Dialog"
        super(props);
        this.state = {
            product:null,
            name: '',
            category: '',
            image: '',
            description: '',
            price: '',
            productUnit: '',
            priceUnit: '',
            submitted: false,
        };
    }

  

    componentDidUpdate = async (prevProps) => {
        if(this.props.product.id
             !== prevProps.product.id){
        this.setState({
            name: this.props.product.name,
            category: this.props.product.category,
            image: this.props.product.image,
            description: this.props.product.description,
            price: this.props.product.price,
            productUnit: this.props.product.productUnit,
            priceUnit: this.props.product.priceUnit,
                   })}
    }
    render() {


        return (

            <div>
                <Toast ref={(el) => this.toast = el} />
                <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={this.productDialogFooter} onHide={this.props.onHide}>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                        Product Name
                        </label>
                        <InputText id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.value })} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.name })} />
                        {this.state.submitted && !this.state.name && <small className="p-error"> Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="category" className="font-bold">
                        Category
                        </label>
                        <InputText id="category" value={this.state.category} onChange={(e) => this.setState({ category: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="image" className="font-bold">
                            Image
                        </label>
                        <InputText id="image" value={this.state.image} onChange={(e) => this.setState({ image: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                        Description
                        </label>
                        <InputText id="description" value={this.state.description} onChange={(e) => this.setState({ description: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="price" className="font-bold">
                        Price
                        </label>
                        <InputText id="price" value={this.state.price} onChange={(e) => this.setState({ price: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="productUnit" className="font-bold">
                        Product Unit
                        </label>
                        <InputText id="productUnit" value={this.state.productUnit} onChange={(e) => this.setState({ productUnit: e.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="priceUnit" className="font-bold">
                        Price Unit
                        </label>
                        <InputText id="priceUnit" value={this.state.priceUnit} onChange={(e) => this.setState({ priceUnit: e.value })} required />
                    </div>
                </Dialog>
            </div>
        );/*
        return (
           
        );*/
    }


   productDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={this.saveProduct} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveProduct} />
            </React.Fragment>
        );

    }


    saveProduct = () => {
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







