import React from 'react'
import { Link } from 'react-router-dom'
function Header() {

    return (
        <div className='header'>
            <h1 id='title'>Rachel Ate It!</h1>
            <p id='phrase'>...so you know it's good!</p>
            <Link id='nav-links-button' to='/login'>Login/Signup</Link>
            <nav className='NavBarItems'>
                <ul className='nav-menu'>
                    <Link id='home' to='/' className='nav-links'>Home</Link>
                    <Link id='rachel-made-it' to='/rachel-made-it' className='nav-links'>Rachel Made It</Link>
                    <Link id='rachel-ate-it' to='/rachel-ate-it' className='nav-links'>Rachel Ate It</Link>
                    <Link id='about' to='/about' className='nav-links'>About</Link>
                    <Link id='favorites' to='/favorites' className='nav-links'>Favorites</Link>
                    
                </ul>

            </nav>
        </div>
    )
}

export default Header