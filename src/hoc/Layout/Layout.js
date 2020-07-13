import React, { useState } from 'react';
import Aux from '../Auxility/Auxiliry';
import classes from './layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const  Layout = (props)=>{
    const [sideDrawerIsVIsible, setSideDrawerIsVIsible] = useState(false);
    // state ={
    //     showSideDrawer: false
    // }
    const sideDrawerClosedHandler = ()=>{
        //this.setState({showSideDrawer:false});
        setSideDrawerIsVIsible(false);
        
    }
    const sideDrawerToggleHandler  = ()=>{
        // this.setState((prevState)=> {
        //         return   {showSideDrawer: !prevState.showSideDrawer}
        //     });     
        setSideDrawerIsVIsible(!sideDrawerIsVIsible);
    }
  
        return(
        <Aux> 
            <ToolBar
                isAuth={props.isAuthenticated} 
                toggleMenu={sideDrawerToggleHandler}/> 
            (/*SideDrawer available for mobile */)
            <SideDrawer 
                        isAuth={props.isAuthenticated}
                        open={sideDrawerIsVIsible}
                        closed={sideDrawerClosedHandler}/>       
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}
 

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    };

}
export default connect(mapStateToProps)(Layout );