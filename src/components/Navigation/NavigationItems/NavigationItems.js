import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) =>{
    return (
    <ul className={classes.NavigationItems}>
        {/* <li><a href={props.link} className={props.active ? classes.active : null}>{props.children} </a></li> */}
        <NavigationItem link="/" exact > Burger Builder </NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders" > ORDERS </NavigationItem> : null}
        
        {props.isAuthenticated 
            ? <NavigationItem link="/logout"  > Logout </NavigationItem>
            : <NavigationItem link="/auth"  > Authenticate </NavigationItem>
        }
                
    </ul>
    );


}
export default navigationItems;