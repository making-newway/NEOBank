import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, FormGroup, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddUser() {
    const [user, setUser] = useState({
        name: '', 
        address: '', 
        dob: '',
        email: '',
        currentBal: '',
        phone: '',
        imgUrl: '',
        gender: ''
    });

    const handleChange = (e) => {                
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        //e.preventdefault();
        console.log(user);

        if (!user.name || !user.address || !user.imgUrl || !user.email || !user.dob || !user.phone || !user.gender) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter All of Your Details',
                confirmButtonText: 'Again, Go to Your account'
            })
        }

        try {
            const res = await axios.post('/customer/add', user);
            Swal.fire({
                icon: 'success',
                title: 'User Added',
                text: 'Customer has been Successfully added',
                confirmButtonText: 'Go to Home Page'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.assign("../");
                }
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
                confirmButtonText: 'Do it Again'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }
    }

    return (
        <section style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ height: '80%', width: '50%', justifyContent: 'center', margin: '25px 0', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <CardHeader className='head' title='Add User'/>
                <Box component='form' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete='off'>
                    <FormGroup row>
                        <TextField required label="Enter Name" variant="outlined" autoComplete='off' name="name" onChange={handleChange} sx={{ width: '52ch !important', '@media (max-width: 944px)': { width: '25ch !important' }} }/>
                    </FormGroup>

                    <FormGroup row>
                        <TextField required label="Enter Phone" variant="outlined" type='number' autoComplete='off' name="phone" onChange={handleChange}/>
                        <TextField required label="Enter Email" variant="outlined" type='enail' autoComplete='off' name="email" onChange={handleChange}/>
                    </FormGroup>

                    <FormGroup row>
                        <TextField required label="Enter Date of Birth" variant="outlined" type='date' autoComplete='off' InputLabelProps={{ shrink: true }} name="dob" onChange={handleChange}/>
                        <TextField required label="Enter Gender" variant="outlined" autoComplete='off' name="gender" onChange={handleChange}/>
                    </FormGroup>

                    <FormGroup row>
                        <TextField required multiline label="Enter Address" variant="outlined" rows={4} autoComplete='off' name="address" onChange={handleChange} sx={{ width: '52ch !important', '@media (max-width: 944px)': { width: '25ch !important' }} }/>
                    </FormGroup>

                    <FormGroup row>
                        <TextField required label="Enter Current Balance" variant="outlined" type='number' autoComplete='off' name="currentBal" onChange={handleChange}/>
                        <TextField required label="Enter Image URL" variant="outlined" autoComplete='off' name="imgUrl" onChange={handleChange}/>
                    </FormGroup>

                    <Button style={{ width: '100%' }} variant="contained" color="success" onClick={handleSubmit}>Add User</Button>
                </Box>
            </Card>
        </section>
    )
}

export default AddUser;