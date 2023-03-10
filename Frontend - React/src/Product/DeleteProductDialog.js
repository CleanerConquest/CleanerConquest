
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default class deleteProductDialog extends React.Component {

    constructor(props) {
        document.title = "Delete Product Dialog"
        super(props);
        this.state = {
            product: {},

        };
    }

    render() {
        return (
            <div>
                <Dialog visible={this.props.visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={this.deleteProductDialogFooter} onHide={this.props.onHide}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.product && (
                            <span>
                                Are you sure you want to delete <b>{this.state.product.name}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        );


    }

    deleteProductDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" outlined onClick={this.props.onHide} />
                <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
            </React.Fragment>
        )
    }




}