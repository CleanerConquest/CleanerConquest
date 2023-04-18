
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import Loading from 'react-loading';
import Swal from 'sweetalert2';
import { PickList } from 'primereact/picklist';
import { ProductService } from '../Service/ProductSevice';
import { CustomerService } from '../Service/CustomerService';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import moment from 'moment/moment';


const $ = window.$

export default class OrderDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            order: null,
            products: [],
            target: [],
            name: '',
            estimated: '',
            customers: [],
            selectedCustomer: {},

        };
        this.productService = new ProductService()
        this.customerService = new CustomerService()
    }

    componentDidMount = () => {
        this.setInital()

    }
    setInital = async () => {
        this.loadProducts()
        this.loadCustomers()
    }
    render() {
        let minDate = new Date()
        return (
            <div>
                {
                    this.state.loading
                        ? <Loading /> :
                        <Dialog visible={this.props.visible} style={{ width: '70rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Order Details" modal className="p-fluid" footer={this.orderDialogFooter} onHide={this.props.onHide}>
                            <div className='field'>
                                <label htmlFor="name" className="font-bold">Order Name</label>
                                <InputText id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} required />
                            </div>
                            <div className='field'>
                                <label htmlFor="estimated" className="font-bold">Estimated Time</label>
                                <Calendar value={this.state.estimated} onChange={(e) => this.setState({ estimated: e.value })} required minDate={minDate} showIcon />
                            </div>
                            <div className='field'>
                                <label htmlFor="customer" className="font-bold">Customer </label>
                                <Dropdown value={this.state.selectedCustomer} onChange={(e) => this.setState({ selectedCustomer: e.value })} options={this.state.customers} optionLabel="name" placeholder="Select a Customer"
                                    filter />
                            </div>
                            <PickList source={this.state.products} target={this.state.target} onChange={e => { this.setState({ products: e.source, target: e.target }) }} itemTemplate={this.itemTemplate} filter filterBy="name" breakpoint="1000px"
                                sourceHeader="Available Products" targetHeader="Selected Products" sourceStyle={{ height: '30rem' }} targetStyle={{ height: '30rem' }}
                                sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" />

                        </Dialog>
                }
            </div>
        );
    }



    itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={'data:image/png;base64,' + item.image} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">{item.price}{item.priceUnit}</span>
                <InputNumber value={item.quantity} onValueChange={(e) => { item.quantity = e.value }} min={0} />

            </div>
        )
    }
    loadProducts = () => {
        this.setState({ loading: true })
        let response = this.productService.getAllProducts()
        response.then(r => { this.setState({ products: r.data.map(v => Object.assign(v, { quantity: 0 })) }) })
        this.setState({ loading: false })

    }
    loadCustomers = () => {
        this.setState({ loading: true })

        let response = this.customerService.getAllCustomers()
        let customer = []
        response.then(r =>
            this.setState({ customers: r.data.map(v => Object.assign(v, { name: v.firstName + ' ' + v.lastName })) }))
        this.setState({ loading: false })


    }

    saveOrder = () => {
        console.log(this.state.selectedCustomer)
        if (this.state.estimated === '' || this.state.name === '' || this.state.selectedCustomer === {}) {
            $.ErrorToast({ detail: "Please Fill Order Details" })
            return
        }
        else if (this.state.target.length === 0) {
            $.ErrorToast({ detail: "Please Select At Least One Product" })
            return
        }
        else {
            for (let i = 0; i < this.state.target.length; i++) {
                if (this.state.target[i].quantity === 0) {
                    $.ErrorToast({ detail: "Please Fill All Quantites" })
                    return
                }
            }
        }

        let productsIDs = []
        let productsQuantities = []
        for (let i = 0; i < this.state.target.length; i++) {
            productsIDs.push(this.state.target[i].id)
            productsQuantities.push(this.state.target[i].quantity)
        }

        let newOrder = {
            name: this.state.name,
            estimated: moment(this.state.estimated).format().split('T')[0],
            productsIDs: productsIDs,
            productsQuantities: productsQuantities,
            customerID: this.state.selectedCustomer.id
        }

        let response = this.props.service.addNewOrder(newOrder)
        response.then(r => {
            if (r.status === 200) {
                $.SuccessToast({ detail: "Order Added Succssfully" })
                this.props.refresh();
                this.props.onHide();
            }
            else {
                $.ErrorToast({ detail: "Adding Order Failed" })
                this.props.refresh();

            }
        })
        console.log(newOrder)

    }

    orderDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" outlined onClick={() => this.props.onHide()} />
                <Button label="Save" icon="pi pi-check" onClick={this.saveOrder} />
            </React.Fragment>
        );

    }
};







