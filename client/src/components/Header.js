import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth'; 

const Header = () => {
    return(
        <div className='ui secondary pointing menu teal inverted'>
            <Link to='/' className='item active' style={{height: 50}}>
                Streamer
            </Link>
            <div className='right menu'>
                <Link to='/' className='item' style={{height: 50}}>
                    Streams
                </Link>
                <GoogleAuth />
            </div>
        </div>
    );
}

export default Header;