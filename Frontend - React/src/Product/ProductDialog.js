
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import Loading from 'react-loading';
import Swal from 'sweetalert2';

const $ = window.$


export default class ProductDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            product: null,
            name: '',
            category: '',
            description: '',
            price: '',
            productUnit: '',
            priceUnit: '',
        };
    }



    componentDidUpdate = async (prevProps) => {
        if (this.props.product.id
            !== prevProps.product.id) {
            this.setState({
                name: this.props.product.name,
                category: this.props.product.category,
                description: this.props.product.description,
                price: this.props.product.price,
                productUnit: this.props.product.productUnit,
                priceUnit: this.props.product.priceUnit,
            })
        }
    }
    render() {


        return (

            <div>
                {
                    this.state.loading ? <Loading /> :
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
                }
            </div>

        );
    }


    productDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={() => this.props.onHide()} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveProduct} />
            </React.Fragment>
        );

    }
    saveProduct = () => {
        if (this.state.name === '' || this.state.category === '' || this.state.description === '' || this.state.price === '' || this.state.productUnit === '' || this.state.priceUnit === '') {
            $.ErrorToast({ detail: "Please Fill All Details" })
            return
        }
        this.setState({ loading: true })

        let { name, category, description, price, productUnit, priceUnit } = this.state
        let data = {
            name: name,
            category: category,
            description: description,
            price: price,
            productUnit: productUnit,
            priceUnit: priceUnit,
        }

        if (this.props.type === 0) {
            Swal.fire({
                title: 'Are you sure about Adding a new Product ?',
                text: "Name : " + this.state.name + ' With Price  ' + this.state.price + ' ' + this.state.priceUnit,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Add it!'
            }).then((result) => {
                if (result.isConfirmed) {

                    let response = this.props.service.addNewProduct(data)
                    response.then(r => {
                        if (r.status === 200) {
                            Swal.fire(
                                'Added!',
                                'This Product has been Succesfully Added.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Adding Product Failed!',
                                'Something went wrong',
                                'error'
                            )
                        }
                    })
                }
            })
        }
        else {
            Swal.fire({
                title: 'Are you sure about updating this Product details ?',
                text: "name : " + this.props.product.name,
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let id = this.props.customer.id
                    let response = this.props.service.editProduct(data, id)
                    response.then(r => {
                        if (r.status === 200) {

                            Swal.fire(
                                'Updated!',
                                'This Product has been Succesfully Updated.',
                                'success'
                            )
                            this.props.refresh();
                            this.props.onHide();
                        }
                        else {
                            Swal.fire(
                                'Updating product Failed!',
                                'Something went wrong',
                                'error'
                            )
                        }
                    })

                }
            })

        }
        this.setState({ loading: false })

    }
};







