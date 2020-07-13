import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Menu from '../SideDrawer/Menu/Menu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        {/* <div>Menu</div> */}
         <Menu clicked={props.toggleMenu}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
           <NavigationItems isAuthenticated={props.isAuth}/>            
        </nav>
    </header>
);
export default toolbar; 