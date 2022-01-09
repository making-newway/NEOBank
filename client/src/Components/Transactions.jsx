import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Transactions() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    const rowsPerPage = 10;

    useEffect(() => {
        axios.get(`/funds/${params.id}`)
        .then((val) => {
            console.log(val.data);
            setData(val.data.customer);
        })
    }, [params.id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className="container-fluid customer-container d-flex justify-content-center align-items-center flex-column mt-3 h-100 overflow-hidden animate__animated animate__fadeIn animate__slow ">
            { data.transactions?.length > 0 ? 
                (<Paper className='row bg-light pt-2 pb-2 mt-4 mb-3' sx={{ width: '90%', overflow: 'hidden' }}>
                    <Typography className='text-center pb-5 py-5' variant='h3'>Transaction details for {data.name}</Typography>
                    <TableContainer sx={{ maxHeight: '400px' }}>
                        <Table stickyHeader aria-label="sticky table" className='table-bordered border-dark mt-2'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Transferred From</TableCell>
                                    <TableCell>Transferred To</TableCell>
                                    <TableCell>Debit</TableCell>
                                    <TableCell>Credit</TableCell>
                                    <TableCell className="bg-warning bg-gradient">Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='text-center fs-6'>
                                {data?.transactions?.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => {
                                    const tempDate=(transaction.updatedAt).toString(); 
                                    const updatedAt=tempDate.substring(0,tempDate.indexOf('GMT'));

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell className="fw-bold">{index+1}</TableCell>
                                            <TableCell>{updatedAt}</TableCell>
                                            <TableCell>{transaction.transactionDetails.transferredFrom}</TableCell>
                                            <TableCell>{transaction.transactionDetails.transferredTo}</TableCell>
                                            {transaction.transactionType === "debit"
                                            ? (
                                                <TableCell className="text-danger fw-bold">
                                                    &#8377;{ (transaction.transactionDetails.amount).toLocaleString('en-IN') }
                                                </TableCell>
                                            ) : <TableCell className="fw-bold">-</TableCell>
                                            }
                                            {transaction.transactionType === "credit"
                                            ? (
                                                <TableCell className="text-success fw-bold">
                                                    &#8377;{ (transaction.transactionDetails.amount).toLocaleString('en-IN') }
                                                </TableCell>
                                            ) : <TableCell className="fw-bold">-</TableCell>
                                            }
                                            <TableCell className="fw-bold bg-warning bg-gradient">
                                                &#8377;{(transaction.transactionDetails.balance).toLocaleString('en-IN')}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination rowsPerPage={rowsPerPage} component='div' count={data?.transactions?.length} page={page} onPageChange={handleChangePage}/>
                </Paper>)
                 : (<div className="row">
                    <h1 className="text-center">There are no transactions at the moment!</h1>
                </div>)
            }
        </div>
    )
}

export default Transactions
