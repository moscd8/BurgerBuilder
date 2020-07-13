import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';
const navigationItem = (props) =>{
     return (
    <div className={classes.NavigationItem}>
           <li> 
               <NavLink 
                    to={props.link}
                    exact={props.exact}
                    activeClassName={classes.active}>
                   {props.children} 
                </NavLink>
            </li>
    </div>);
}

export default navigationItem;