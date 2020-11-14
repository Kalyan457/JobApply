import React from 'react';
import classes from './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () =>{
    return (
        <div className={classes.menuItems}>
            <button className={classes.userInfo}>Welcome User</button>
            <div className={classes.dropdownContent}>
                <Link to="/profile" className={classes.linkBtns}>My Profile</Link>
                <Link to="/home" className={classes.linkBtns}>Home</Link>
                <Link to="/savedapplications" className={classes.linkBtns}>Saved Applications</Link>
                <Link to="/trackapplications" className={classes.linkBtns}>Track Applications</Link>
            </div>
        </div>
      );
};

export default Menu;