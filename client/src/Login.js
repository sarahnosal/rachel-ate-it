import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';


const theme = createTheme({
    palette: {
        background: {
            default: "F3DFE3"
        }
    }
})

function Login( { setUser }) {
    const [showLogin, setShowLogin] = useState(true);

    function handleClick () {
        setShowLogin(!showLogin)
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{background: '#F0BEC8', textAlign: "center"}}>
            <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                <Typography component="h1" variant="h4" sx={{fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', mt: "10px", mb: "10px"}}>
                Welcome to Rachel Ate It!
                </Typography>
                {showLogin ? <LoginForm setUser={setUser}/> : <SignupForm setUser={setUser}/>}
            </Box>
            <Divider/>
            <Typography component="h2" variant="h6" sx={{ fontFamily: 'Alex Brush', color: '#1D6947', fontSize: '30px', mt: 4}}> 
            {showLogin ? "Don't have an account?": "Already have an account?"} 
            </Typography>
            <Button  variant="contained" onClick={handleClick} 
                sx={[
                    {
                        '&:hover': {
                            backgroundColor: '#1D6947'
                        },
                    },
                    { backgroundColor: '#DD798C', fontWeight: 'bold', fontFamily: 'Cormorant SC', mt: 2, mb: 4 }]}>
                {showLogin ? "Sign Up" : "Log In"} 
            </Button>
            </Container>
        </ThemeProvider>
    );
}

export default Login;