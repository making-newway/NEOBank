import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, FormGroup, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddFunds({ id }) {
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState('');

    const handleChange = () => {
        setOpen(!open);
    }

    const handleSubmit = async (e) => {
        const form = {
            "amount": val,
        };

        e.preventDefault();
        handleChange();

        if(val > 0 || val < 0 ) {
            try {
                const res = await axios.post(`/funds/${id}/addFunds`, form);
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successfill',
                    text: `Customer has been added ${val} rupees`,
                    confirmButtonText: 'Go to Your account'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            } catch (error) {
                // alert(error.response.data.msg);
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.msg}`,
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
            <button type="button" className="btn btn-md btn-success fw-bold" onClick={handleChange}>
                Add Funds
            </button>
            <Dialog onClose={handleChange} open={open} maxWidth='sm' fullWidth={true}>
                <DialogTitle>Add Fund to Account</DialogTitle>
                <FormGroup row>
                    <Box component='form' sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }} autoComplete='off'>
                        <TextField required label="Enter Amount" variant="outlined" autoComplete='off' type="number" value={val} onChange={(e) => setVal(e.target.value)}/>   
                    </Box>
                </FormGroup>
                <DialogActions>
                    <Button onClick={handleChange}>Cancel</Button>
                    <Button onClick={handleSubmit} type='submit' autoFocus>Add Funds</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddFunds;
