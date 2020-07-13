import React from 'react'; 
import classes from './sideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxility/Auxiliry';

const sideDrawer = (props) =>{
    let attachClassess = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachClassess= [classes.SideDrawer,classes.Open];
    }

    return (
        <Aux>
        <Backdrop  show={props.open} clicked={props.closed}/>
        <div className={attachClassess.join(' ')} onClick={props.closed}>
            <Logo height="11%"/> 
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>

        </div>
        </Aux>
    );


}
export default sideDrawer;