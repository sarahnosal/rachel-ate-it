import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function LoginForm({onLogin}) {
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        fetch('/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        })
        .then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((userData) => onLogin(userData))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
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
                    margin="normal"
                    required
                    fullWidth
                    variant='outlined'
                    label='username'
                    name='username'
                    onChange={handleChange}
                    value={credentials.username}/>
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    variant='outlined'
                    name='password'
                    label='password'
                    onChange={handleChange}
                    value={credentials.password}/>
                <Button
                    variant='contained' 
                    type='submit' 
                    sx={{ mt: 3, mb: 2 }}>
                        {isLoading ? "Loading..." : "Log In"}
                </Button>
                {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e}</Typography>) : null}
            </Box>
        </>
    )
}

export default LoginForm