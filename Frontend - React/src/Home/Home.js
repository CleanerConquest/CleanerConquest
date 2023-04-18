

import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { HomeService } from '../Service/HomeService';
import moment from 'moment/moment';
import { Chart } from 'primereact/chart';
import Loading from '../Components/Loading';

const $ = window.$

export default class Home extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            customerCountData: {},
            customerCountOptions: { scales: { y: { beginAtZero: true } } },
            orderSumData: {},
            orderSumOptions: { scales: { y: { beginAtZero: true } } },
            orderCountData: {},
            orderCountOptions: { cutout: '60%' },
        };
        this.homeService = new HomeService()
    }


    componentDidMount() {
        this.setInitialState()
    }
    setInitialState = async () => {
        this.loadCoustomerCount();
        this.loadOrderSum();
        this.loadOrderCount();
    }


    render() {

        return (
            //Zaid Come Here
            //We Need To Create This Page
            this.state.loading ? <Loading /> :
                <div className='divContainer'>
                    <div className='card'>
                        <Chart type='bar' width='10ْ' data={this.state.customerCountData} options={this.state.customerCountOptions} />
                    </div>
                    <div className='card'>
                        <Chart type='bar' width='10ْ' data={this.state.orderSumData} options={this.state.orderSumOptions} />
                    </div>
                    <div className='card flex justify-content-center' >
                        <Chart type='doughnut' data={this.state.orderCountData} options={this.state.orderCountOptions} className="w-full md:w-30rem" />
                    </div>
                </div>
        );
    }

    loadScreen = () => {
        this.setState({ loading: true })

        this.setState({ loading: false })
    }


    loadCoustomerCount = () => {
        let costumerCount = this.getCostumerByMonthCount()

        this.setState({
            customerCountData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: 'Customers Earned Each Month',
                        data: costumerCount,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(100, 180, 200, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgba(100, 180, 200, 0.2)',

                        ],
                        borderWidth: 1
                    }
                ]
            }
        })
    }


    getCostumerByMonthCount = () => {
        let jan = new Date(2023, 1).toISOString().split('T')[0]
        let feb = new Date(2023, 2).toISOString().split('T')[0]
        let mar = new Date(2023, 3).toISOString().split('T')[0]
        let apr = new Date(2023, 4).toISOString().split('T')[0]
        let may = new Date(2023, 5).toISOString().split('T')[0]
        let janRes = this.homeService.getCustomerByDate(jan);
        let febRes = this.homeService.getCustomerByDate(feb);
        let marRes = this.homeService.getCustomerByDate(mar);
        let aprRes = this.homeService.getCustomerByDate(apr);
        let mayRes = this.homeService.getCustomerByDate(may);
        let costumerMonthCount = [];
        janRes.then(r => { r.status === 204 ? costumerMonthCount.push(0) : costumerMonthCount.push(r.data) });
        febRes.then(r => { r.status === 204 ? costumerMonthCount.push(0) : costumerMonthCount.push(r.data) });
        marRes.then(r => { r.status === 204 ? costumerMonthCount.push(0) : costumerMonthCount.push(r.data) });
        aprRes.then(r => { r.status === 204 ? costumerMonthCount.push(0) : costumerMonthCount.push(r.data) });
        mayRes.then(r => { r.status === 204 ? costumerMonthCount.push(0) : costumerMonthCount.push(r.data) });
        return costumerMonthCount
        let finalCustomerCount = []
        finalCustomerCount.push(costumerMonthCount[0]);
        finalCustomerCount.push(costumerMonthCount[1] - costumerMonthCount[0]);
        finalCustomerCount.push(costumerMonthCount[2] - (costumerMonthCount[1] + costumerMonthCount[0]));
        finalCustomerCount.push(costumerMonthCount[3] - (costumerMonthCount[1] + costumerMonthCount[0] + costumerMonthCount[2]));
        finalCustomerCount.push(costumerMonthCount[4] - (costumerMonthCount[1] + costumerMonthCount[0] + costumerMonthCount[2] + costumerMonthCount[3]));
        return finalCustomerCount
    }


    loadOrderSum = () => {
        let orderSum = this.getOrderSum()
        this.setState({
            orderSumData: {
                labels: ['UnFinished Orders', 'Finished Orders',],
                datasets: [
                    {
                        label: 'Order Summation By Progress',
                        data: orderSum,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1
                    }
                ]
            }
        })
    }
    getOrderSum = () => {
        let today = new Date().toISOString().split('T')[0]
        let orderSum = []
        let unFinishedResponse = this.homeService.sumUnfinishedOrderByDate(today)
        let finishedResponse = this.homeService.sumFinishedOrderByDate(today)
        unFinishedResponse.then(r => { orderSum.push(r.data) })
        finishedResponse.then(r => { orderSum.push(r.data) })
        return orderSum
    }

    loadOrderCount = () => {
        let orderCount = this.getOrderCount()
        this.setState({
            orderCountData: {
                labels: ['UnFinished Orders', 'All Orders',],
                datasets: [
                    {
                        label: 'Order Count',
                        data: orderCount,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1
                    }
                ]
            }
        })
    }
    getOrderCount = () => {
        let today = new Date().toISOString().split('T')[0]
        let orderCount = []
        let unFinishedResponse = this.homeService.countUnfinishedOrderByDate(today)
        let finishedResponse = this.homeService.countOrderByDate(today)
        unFinishedResponse.then(r => { orderCount.push(r.data) })
        finishedResponse.then(r => { orderCount.push(r.data) })
        return orderCount
    }
}


