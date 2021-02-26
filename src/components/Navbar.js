import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <Link to='/main' className='navbar-logo' onClick={closeMobileMenu}>
          LegislatorLookup
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/LegislatorLookup' className='nav-links' onClick={closeMobileMenu}>
              Landing
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/main'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Main
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/explore'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Register To Vote
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
