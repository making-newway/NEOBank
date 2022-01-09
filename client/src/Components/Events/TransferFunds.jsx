import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, FormGroup, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function TransferFunds({ id, allCustomers }) {
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState('');
    const [receiver, setReceiver] = useState('');

    const handleChange = () => {
        setOpen(!open);
    }
    
    const handleSubmit = async (e) => {
        const form = {
            "amount": val,
            "transferTo": receiver
        };

        e.preventDefault();
        handleChange();

        if(val > 0 || val < 0 ) {
            try {
                const res = await axios.post(`/funds/${id}/transfer`, form);
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successfill',
                    text: `Fund has been transferred to ${receiver} ${val} rupees`,
                    confirmButtonText: 'Go to Your account'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }
            catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.msg}`,
                    confirmButtonText: 'Again, Go to Your account'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-md btn-danger fw-bold" onClick={handleChange}>
                Transfer Funds
            </button>
            <Dialog onClose={handleChange} open={open} maxWidth='sm' fullWidth={true}>
                <DialogTitle>Transfer Fund to Account</DialogTitle>
                <FormGroup row>
                    <Box component='form' sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }} autoComplete='off'>
                        <TextField select required label="Select Receiver" variant="outlined" value={receiver} onChange={(e) => setReceiver(e.target.value)} >
                            {allCustomers?.map((customer, index) => (
                                <MenuItem key={index} value={customer.accNo}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </FormGroup>
                <br/><br/>
                <FormGroup row>
                    <Box component='form' sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }} autoComplete='off'>
                        <TextField required label="Enter Amount" variant="outlined" autoComplete='off' type="number" value={val} onChange={(e) => setVal(e.target.value)}/>   
                    </Box>
                </FormGroup>
                <DialogActions>
                    <Button onClick={handleChange}>Cancel</Button>
                    <Button onClick={handleSubmit} type='submit' autoFocus>Transfer Funds</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TransferFunds;