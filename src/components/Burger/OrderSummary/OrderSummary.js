import React  from 'react';
import Aux from '../../../hoc/Auxility/Auxiliry'; 
import Button from '../../UI/Button/Button';

const  OrderSummary =props => {
    // componentDidMount(){
    //     console.log('[OrderSummary] WillUpdate')
    // }
 
        const ingredientsSummary = Object.keys( props.ingredients)
        .map( igKey => {
            return (
                <li key={igKey}> 
                    <span style={{textTransform: 'capitalize'}}>{igKey} : {props.ingredients[igKey]}</span>
                </li>
            );
        });
        return (
            <Aux > 
            <h3>Your Order</h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <b>Total: {props.totalPrice.toFixed(2)}$</b>
           <p> Continue to Checkout?</p>
           <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
           <Button btnType="Success" clicked={props.purchaseContinue} >CONTINUE</Button>
           
        </Aux>
        )
  


    // const totalToPay= Object.keys(props.ingredients)
    // .map( igKey => {
    //     return (props.ingredients[igKey])
    // })
       
    // return (
    //     <Aux > 
    //         <h3>Your Order</h3>
    //         <p> A delicious burger with the following ingredients: </p>
    //         <ul>
    //             {ingredientsSummary}
    //         </ul>
    //         <b>Total: {props.totalPrice.toFixed(2)}$</b>
    //        <p> Continue to Checkout?</p>
    //        <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
    //        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
           
    //     </Aux>
    // );

}; 
export default OrderSummary;