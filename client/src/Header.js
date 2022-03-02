import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';


function Header({setUser, user}) {
    function handleClick() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }

    return (
        <div className='header'>
            <h1 id='title'>Rachel Ate It!</h1>
            <p id='phrase'>...so you know it's good!</p>
            <span id='welcome' >Welcome, {user.name}!</span>
            <Link id='nav-links-button' to='/home'>
                <Button
                    onClick={handleClick}
                    variant='container'
                    color='sucess'
                    sx={{fontFamily: 'Cormorant SC', fontWeight: 'bold'}}>Log Out</Button>
            </Link>
            <nav className='NavBarItems'>
                <ul className='nav-menu'>
                    <Link id='home' to='/home' className='nav-links'>Home</Link>
                    <Link id='rachel-made-it' to='/made-it' className='nav-links'>Rachel Made It</Link>
                    <Link id='rachel-ate-it' to='/ate-it' className='nav-links'>Rachel Ate It</Link>
                    <Link id='about' to='/about' className='nav-links'>About</Link>
                    <Link id='favorites' to='/favorites' className='nav-links'>Favorites</Link>
                    
                </ul>

            </nav>
        </div>
    )
}

export default Header
