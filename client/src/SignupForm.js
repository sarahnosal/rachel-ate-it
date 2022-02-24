import React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SignupForm({onLogin}){
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username : "",
        name: "",
        password : "",
        password_confirmation : ""
    })

    function handleSubmit(e){
        e.preventDefault();
        setErrors([])
        setIsLoading(true)
        fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
        .then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((userData) => onLogin(userData))
            }
            else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    };

    function handleChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
            <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                    margin='normal'
                    fullWidth
                    variant='outlined'
                    required
                    label='username'
                    name='username'
                    onChange={handleChange}
                    value={credentials.username} />
                <TextField
                    margin='normal'
                    fullWidth
                    variant='outlined'
                    required
                    label='name'
                    name='name'
                    onChange={handleChange}
                    value={credentials.name} />
                <TextField
                    margin='normal'
                    fullWidth
                    variant='outlined'
                    required
                    label='password'
                    name='password'
                    onChange={handleChange}
                    value={credentials.password} />
                <TextField
                    margin='normal'
                    fullWidth
                    variant='outlined'
                    required
                    label='password_confirmation'
                    name='password_confirmation'
                    onChange={handleChange}
                    value={credentials.password_confirmation} />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}>
                        {isLoading ? "Loading..." : 'Sign Up'}
                </Button>
            </Box>
            {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e}</Typography>) : null}
        </>
    )
}

export default SignupForm