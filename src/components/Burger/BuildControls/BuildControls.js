import React from 'react';
import classes from './BuildControls.module.css'; 
import BuildControll from './BuildControl/BuildControl';

const controls= [
    {lable: 'Salad', type: 'salad'},
    {lable: 'Meat', type: 'meat'},
    {lable: 'Tometo', type: 'tometo'},
    {lable: 'Pickle', type: 'pickle'}
];

const buildControls = (props) => (
    <div className={classes.BuildControlls}>
        {/* <BuildControll lable="test"/>
         */}
        <p>Current Price: <b>{props.sum.toFixed(2)} $</b></p>
         {controls.map(ctrl => (
             <BuildControll 
             key={ctrl.lable} 
             lable={ctrl.lable}
             added={() => props.ingredientsAdded(ctrl.type)}
             remove={() => props.ingredientsRemove(ctrl.type)}  
             disabled={props.disabled[ctrl.type]}/>
         ))}

         <button className={classes.OrderButton}
         disabled={!props.purchasable}
         onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>

    </div>
); 

export default buildControls;