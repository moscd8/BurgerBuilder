import React from 'react'; 
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary = (props) =>{
return (
    <div className={classes.CheckoutSummary}> 
        <h1> We hope its test Well</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients} />
            <Button btnType="Danger" clicked={props.CheckoutCanclled}> 
                Cancel 
            </Button>

            <Button btnType="Success" clicked={props.CheckoutContinued}> 
                Continue 
            </Button>
            

        </div>
    </div>
);    
} 
export default CheckoutSummary;