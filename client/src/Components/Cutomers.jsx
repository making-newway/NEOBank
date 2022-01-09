import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddFunds from './Events/AddFunds';
import Withdraw from './Events/Withdraw';
import TransferFunds from './Events/TransferFunds';

function Customers() {
    const params = useParams();
    const [props, setProps] = useState({customer: {}});

    useEffect(() => {
        axios.get(`/customer/${params.id}`)
        .then(data => {
            setProps(data.data);
        })
    }, [params.id])

    return (
        <div className="container-fluid customer-container d-flex justify-content-center align-items-center flex-column mt-3 h-100 overflow-hidden animate__animated animate__fadeIn animate__slow ">
            <Card className="p-2 customer-card">
                <Typography gutterBottom variant="h5" component="div"> Customer Account Details </Typography>
                <CardContent className='d-flex align-items-center justify-content-evenly mt-3 mb-3 c-pic-info'>
                    <CardMedia component="img" className='p-1 mt-2 border border-dark w-25' image={props.customer.imgUrl} />
                    <Box>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="fw-bold"> Name: </span>
                                {props.customer.name}
                            </li>
                            <li className="list-group-item">
                                <span className="fw-bold"> Date of Birth: </span>
                                {props.dob}
                            </li>
                            <li className="list-group-item">
                                <span className="fw-bold"> Gender: </span>
                                {props.customer.gender}
                            </li>
                            <li className="list-group-item">
                                <span className="fw-bold"> Created on: </span>
                                {props.createdAt}
                            </li>
                            <li className="list-group-item">
                                <span className="fw-bold"> Modified on: </span>
                                {props.modifiedAt}
                            </li>
                        </ul>
                    </Box>
                </CardContent>
                <CardContent className='card-body border border-dark mt-2'>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="fw-bold"> Account ID : </span>
                            {props.customer.accNo}
                        </li>
                        <li className="list-group-item">
                            <span className="fw-bold"> Email ID : </span>
                            {props.customer.email}
                        </li>
                        <li className="list-group-item">
                            <span className="fw-bold"> Contact Number : </span>
                            {props.customer.phone}
                        </li>
                        <li className="list-group-item">
                            <span className="fw-bold"> Residential Address : </span>
                            {props.customer.address}
                        </li>
                        <li className="list-group-item">
                            <span className="fw-bold"> Current Balance : </span>
                            &#8377;{(props.customer.currentBal)}
                        </li>
                    </ul>
                </CardContent>
                <CardActions className="container-fluid buttons-container d-flex justify-content-around align-items-center mt-3">
                    <Link to={`transactions`} className="btn btn-md btn-primary fw-bold" >View Transactions</Link>
                    <AddFunds id={params.id} />
                    <Withdraw id={params.id} />
                    <TransferFunds id={params.id} allCustomers={props.allCustomers} />
                </CardActions>
            </Card>
        </div>
    )
}

export default Customers;
