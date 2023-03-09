

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import WorkerDialog from './WorkerDialog';

export default class Worker extends React.Component {
    constructor(props) {
        document.title = "Worker"
        super(props);
        this.state = {
            workers: [],
            worker: this.emptyWorker,
            selectedWorkers: [],
            globalFilter: null,
            submitted: false,
            workerDialog: false,
            deleteWorkersDialog: false,
            deleteWorkerDialog: false,
        };
    }
    emptyWorker = {
        id: 1,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        employedAt: '',
        unemploymentAt: '',

    };

    componentDidMount() {
        this.setInitialState()
    }

    setInitialState = async () => {

    }

    render() {
        return (
            <div className='divContainer'>
                <WorkerDialog visible={this.state.workerDialog} onHide={this.hideWorkerDialog} worker={this.state.worker} />
                <div className='card'>
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate} />
                    <DataTable ref={(e) => (this.dataTable = e)}
                        value={this.state.workers}
                        selection={this.state.selectedWorkers}
                        onSelectionChange={(e) => this.setState({ selectedWorkers: e.value })}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Workers"
                        globalFilter={this.state.globalFilter}
                        header={this.header}>

                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>
                        <Column field="firstName" header="First Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="lastName" header=" Last Name " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="phoneNumber" header="Phone Number " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="address" header="Address " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="employedAt" header="Employed At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="unemploymentAt" header="Unemployment At  " sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                    </DataTable>
                </div>
            </div>
        );
    }

    header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">All Workers</h4>
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
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedWorkers || !this.state.selectedWorkers.length} />
            </div>
        );
    };

    openNew = () => {
        this.emptyWorker.id = this.emptyWorker.id + 1;
        this.setState({
            worker: JSON.parse(JSON.stringify(this.emptyWorker)),
            submitted: false,
            workerDialog: true,
        })
    };

    confirmDeleteSelected = () => {
        this.setState({ deleteWorkersDialog: true })
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => this.editWorker(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => this.confirmDeleteWorker(rowData)} />
            </React.Fragment>
        );
    };

    editWorker = (worker) => {
        this.setState({
            worker: worker,
            workerDialog: true,
        })
    };

    confirmDeleteWorker = (worker) => {
        this.setState({
            worker: worker,
            deleteWorkerDialog: true,
        })
    };

    hideWorkerDialog = () => {
        this.setState({ workerDialog: !this.state.workerDialog })
    }
}


