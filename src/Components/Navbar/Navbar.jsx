import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ userRole, isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='nav'>
      <div className="nav-logo">Learning Management System</div>
      <div className="hamburger" onClick={toggleMenu}> 
        &#9776;
      </div>
      <ul className={`nav-menu ${menuOpen ? 'show' : ''}`}>
        <li>
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            <i className="fas fa-home"></i><span> Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" activeClassName="active" className="nav-link">
            <i className="fas fa-info-circle"></i><span> About</span>
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/Courses" activeClassName="active" className="nav-link">
                <i className="fas fa-book"></i><span> Courses</span>
              </NavLink>
            </li>
            {userRole === 'ADMIN' && (
              <li>
                <NavLink to="/Admin" activeClassName="active" className="nav-link">
                  <i className="fas fa-book"></i><span> Admin</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/Login" activeClassName="active" className="nav-link" onClick={handleLogout}>
                <i className="fas fa-user"></i><span> Logout</span>
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/Login" activeClassName="active" className="nav-link">
              <i className="fas fa-user"></i><span> Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
