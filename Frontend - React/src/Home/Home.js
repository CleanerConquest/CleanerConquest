

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class Home extends React.Component {
    constructor(props) {
     
        super(props);
        this.state = {
         
        };
    }
   

    componentDidMount() {
    }

   

    render() {
        return (
            <div className='divContainer'>
         <img src='https://images.pexels.com/photos/5015227/pexels-photo-5015227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' ></img>
            </div>
        );
    }


}


