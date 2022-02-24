
import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SignupForm({ setUser }) {
    const [errors, setErrors] = useState(null)
    const [credentials, setCredentials] = useState({
        username : "",
        name: "",
        password : "",
        password_confirmation : ""
    })
    
    function handleSubmit (e) {
        e.preventDefault();
        fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((userData) => setUser(userData))
            }
            else {
                r.json().then((err) => setErrors(err.error))
            }
        })
    };

    function handleChange (e) {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }
    
      return (
        <>
            <Box component="form" noValidate sx={{  mt: 1 }} onSubmit={handleSubmit}>
            <TextField
                sx={{fontFamily: 'Alex Brush'}}
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                value={credentials.username}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                value={credentials.name}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handleChange}
                value={credentials.password}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                variant="outlined"
                type="password"
                onChange={handleChange}
                value={credentials.password_confirmation}
            />
            <Button
                type="submit"
                variant="contained"
                sx={[
                    {
                        '&:hover': {
                            backgroundColor: '#1D6947'
                        },
                    }, {backgroundColor: '#DD798C', fontFamily: 'Cormorant SC', fontWeight: 'bold' , mt: 3, mb: 2 }]}
            >
                Sign Up
            </Button>
            </Box>
            {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e} </Typography>) : null}
        </>
      );
}

export default SignupForm;