
import React from 'react'
import { Button } from 'primereact/button';

export default class Footer extends React.PureComponent {
    render() {
        return (
            <div>
                <Button label="حفظ" icon="pi pi-check" onClick={this.props.onChangeSave} className="p-button-primary" />
                <Button label="عدم الحفظ" icon="pi pi-times" onClick={this.props.onChange} className="p-button-secondary" />
                <Button label="تراجع" icon="pi pi-ban" onClick={this.props.onNo} className="p-button-secondary" />

            </div>
        )
    }
}
/*
export class FooterCancel extends React.PureComponent {
    render() {
         return (
            <div>
                <Button label="نعم" icon="pi pi-check" onClick={this.props.onYes} className="p-button-secondary" />
                <Button label="لا" icon="pi pi-times" onClick={this.props.onNo} />
            </div>
        )
    }
}*/