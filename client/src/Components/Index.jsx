import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from '@mui/material';

function Index() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('/customer/')
        .then(customer => {
            console.log(customer.data);
            setCustomers(customer.data);
        })        
    }, []);

    const StyledTableCell = (props) => {
        return (
            <TableCell align={props.align} style={{ backgroundColor: 'black', color: 'white', fontSize: '14' }}>
                {props.children}
            </TableCell>
        )
    }

    return (
        <div className='home-container container mt-4 animate__animated animate__fadeIn animate__slow '>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No.</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Email ID</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Current Balance</StyledTableCell>
                            <StyledTableCell align="right">Details</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right"><span>&#8377;</span>{(row.currentBal).toLocaleString('en-IN')}</TableCell>
                                <TableCell align="right"><a type="button" className="btn btn-sm btn-primary p-1 fw-bold" href={`/customers/${(row.accNo).toString()}`} >View Details </a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Index
