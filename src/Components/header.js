import React from 'react';
import './header.css';
const Header = ({ ammount }) => {
    return (
        <header className='header'>
            <div className='header-items'>
                <h2>UseReducer</h2>
                <div className='counter-container'>
                    <i className='fas fa-shopping-cart fa-2x'></i>
                    <p className='counter'>{ammount}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
