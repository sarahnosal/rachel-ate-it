import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const theme= createTheme() 

function Login({onLogin}){
    const [showLogin, setShowLogin] = useState(true)

    function handleClick() {
        setShowLogin(!showLogin)
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{textAlign: "center"}}>
            <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                <Typography component="h1" variant="h4" sx={{mt: "10px", mb: "10px"}}>
                Log in to view more content!
                </Typography>
                {showLogin ? <LoginForm onLogin={onLogin}/> : <SignupForm onLogin={onLogin}/>}
            </Box>
            <Divider/>
            <Typography component="h2" variant="h6" sx={{ mt: 4}}> 
            {showLogin ? "Don't have an account?": "Already have an account?"} 
            </Typography>
            <Button variant="contained" onClick={handleClick} sx={{ mt: 2, mb: 4 }}>
                {showLogin ? "Sign Up" : "Log In"} 
            </Button>
            </Container>
        </ThemeProvider>
    )
}

export default Login