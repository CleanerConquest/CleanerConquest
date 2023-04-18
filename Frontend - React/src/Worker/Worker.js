

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import WorkerDialog from './WorkerDialog';
import Loading from '../Components/Loading';
import { WorkerService } from '../Service/WorkerService';
import Swal from 'sweetalert2';
const $ = window.$

export default class Worker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            workers: [],
            worker: this.emptyWorker,
            selectedWorkers: [],
            globalFilter: null,
            workerDialog: false,
            edit: 0,
        };
        this.workerService = new WorkerService()
    }
    emptyWorker = {
        id: 0,
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
        this.loadData()
    }

    render() {
        return (
            <div className='divContainer'>
                <WorkerDialog visible={this.state.workerDialog} onHide={this.hideWorkerDialog} worker={this.state.worker} type={this.state.edit} service={this.workerService} refresh={this.loadData} />
                {this.state.loading ? <Loading /> :
                    <div className='card'>
                        <Toolbar className="mb-4" left={this.leftToolbarTemplate()} right={this.rightToolbarTemplate} />
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
                            {/*<Column field="id" header="id" sortable style={{ minWidth: '12rem' }} visible={false}></Column>*/}
                            <Column field="firstName" header="First Name" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="lastName" header=" Last Name " sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="phoneNumber" header="Phone Number " sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="address" header="Address " sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="employedAt" header="Employed At" sortable body={this.formatEmployed} style={{ minWidth: '12rem' }}></Column>
                            <Column field="unemploymentAt" body={this.formatUnEmployed} header="Unemployment At  " sortable style={{ minWidth: '12rem' }}></Column>
                            <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                        </DataTable>
                    </div>
                }
            </div>
        );
    }

    loadData = () => {
        this.setState({ loading: true })
        let response = this.workerService.getAllWorkers();
        response.then(r => {
            if (r.status === 200) {
                this.setState({ workers: r.data })
            }
            else if (r.status === 204) {
                $.WarnToast({ detail: "No  Workers Found" })
            }
            else {
                $.ErrorToast({ detail: "Loading Workers Failed" })
            }
        })
        this.setState({ loading: false })
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
        return (//                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={this.GetSelectedWorkers} disabled={this.state.selectedWorkers && !this.state.selectedWorkers.length > 0} />

            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={this.openNew} />
            </div>
        );
    };

    openNew = () => {
        this.emptyWorker.id = this.emptyWorker.id + 1;
        this.setState({
            worker: JSON.parse(JSON.stringify(this.emptyWorker)),
            workerDialog: true,
            edit: 0,
        })
    };


    formatEmployed = (worker) => {
        return worker.employedAt.split('T')[0]
    }
    formatUnEmployed = (worker) => {
        if (worker.unemploymentAt !== null)
            return worker.unemploymentAt.split('T')[0]
        else return 'Still An Employee'
    }
    rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />;
    };

    exportCSV = () => {
        this.dataTable.exportCSV();
    };

    actionBodyTemplate = (rowData) => {
        return (

            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" style={{ width: '3rem' }} onClick={() => this.editWorker(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" style={{ width: '3rem' }} onClick={() => this.GetSelectedWorker(rowData)} disabled={rowData.unemploymentAt} />
            </React.Fragment>
        );
    };

    editWorker = (worker) => {
        this.setState({
            worker: worker,
            workerDialog: true,
            edit: 1
        })
    };

    GetSelectedWorkers = async () => {
        let workers = this.state.selectedWorkers
        console.log(workers)
        workers.forEach(async selectedWorker =>
            await this.deleteWorker(selectedWorker)
        )
    };
    GetSelectedWorker = (worker) => {
        this.deleteWorker(worker)
    };

    deleteWorker = async (worker) => {
        Swal.fire({
            title: 'Are you sure about UnEmploying Worker ?',
            text: " You're about to UnEmployee " + worker.firstName + ' ' + worker.lastName,
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, UnEmployee!'
        }).then((result) => {
            if (result.isConfirmed) {

                let response = this.workerService.deleteWorker(worker.id)
                response.then(r => {
                    if (r.status === 200) {
                        Swal.fire(
                            'Unemplyed!',
                            ' Worker have been Succesfully Unemployeed.',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Unemployeng Worker Failed!',
                            'Something went wrong',
                            'error'
                        )
                    }
                    this.loadData()
                })
            }
            else {
                Swal.fire(
                    'Cancelled',
                    'Your Worker  is safe',
                    'error'
                )
            }
        })
    }


    hideWorkerDialog = () => {
        this.setState({ workerDialog: !this.state.workerDialog })
    }
}


