import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classes from './NonUser.module.css';
import moneyImg from '../../../assets/5867.png';
import analyticsImg from '../../../assets/analytics.png';
import billsImg from '../../../assets/bills.png';
import reportImg from '../../../assets/report.png';
import lockImg from '../../../assets/lock.png';
import { Link } from 'react-router-dom';
class NonUser extends Component {

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <Card className={"col-12 col-sm-12 col-md-3 col-lg-3 pl-0 pr-0 mt-sm-5 mt-md-0 " + classes.card}>
                        <img className={"mx-auto " + classes.image} src={moneyImg} alt='bck-img'></img>
                        <CardContent>
                            <div className="font-weight-bold">Track your income and expense</div>
                            <div>
                                <small>
                                    Keep track of your income and expense by adding them as you go
                                </small>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"ml-md-3 ml-lg-3 mt-sm-2 col-12 col-sm-12 col-md-3 col-lg-3 pl-0 pr-0 mt-sm-2 mt-md-0 " + classes.card}>
                        <img className={"mx-auto " + classes.image} src={analyticsImg} alt='bck-img'></img>
                        <CardContent>
                            <div className="font-weight-bold">Analytics on your income</div>
                            <div>
                                <small>
                                    Analyze your income and expense using the dashboard
                                </small>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"ml-md-3 ml-lg-3 col-12 col-sm-12 col-md-3 col-lg-3 pl-0 pr-0 mt-sm-2 mt-md-0 " + classes.card}>
                        <img className={"mx-auto " + classes.image} src={billsImg} alt='bck-img'></img>
                        <CardContent>
                            <div className="font-weight-bold">Manage monthly income and bills</div>
                            <div>
                                <small>
                                    Add/Remove monthly income sources and bill reminders for easy management.
                                </small>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"col-12 col-sm-12 col-md-3 col-lg-3 pl-0 pr-0 mt-sm-2 mt-md-0 " + classes.card}>
                        <img className={"mx-auto " + classes.image} src={reportImg} alt='bck-img'></img>
                        <CardContent>
                            <div className="font-weight-bold">Report generation</div>
                            <div>
                                <small>
                                    Generate report for various time ranges and download them.
                                </small>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"text-center ml-md-3 ml-lg-3 col-12 col-sm-12 col-md-3 col-lg-3 pl-0 pr-0 mt-sm-2 mt-md-0 " + classes.card}>
                        <div className="justify-content-center">
                            <img className={classes['lock-image']} src={lockImg} alt='bck-img'></img>
                        </div>
                        <CardContent>
                            <div className="font-weight-bold">
                                <Link to="/login">Login</Link>
                            </div>
                            <div>
                                <small>
                                    Login to access these features
                                </small>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default NonUser;