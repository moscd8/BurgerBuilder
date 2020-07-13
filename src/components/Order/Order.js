import React from 'react';
 
import classes from './Order.module.css';
import Button from '../UI/Button/Button'
const order = (props) =>{  
     
    const ingredients= [];
    const customer= [];
    
    const cancle = () => {
        console.log('cancel')
        //TODO
    }
    
    const finished = () => {
        console.log('finished')
        //TODO
    }
    
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
    return <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: ' 0 8px',
                border: '2px solid #ccc', 
                // #c49552
                padding : '5px'
            }}
            > {ig.name } : ({ig.amount}) </span> 
    });

    for(let customerVar in props.orderData){
        if(customerVar === 'name')
        {
            customer.push({
            name:props.orderData[customerVar]
            })
        }
        if(customerVar === 'email'){
            customer.push({
                email: props.orderData[customerVar]
            })
        }
    }  
    //key={n.name+'_key'}
    // let customerName= customer.map(n => {
    //     return  <div >
    //               {n.name} 
    //              {/* <h7 className={classes.Email}>{n.email}</h7>      */}

    //              </div>
    //         }); 
  
    // let customerEmail= customer.map(n => {
    //     return  <div key={n.key} className= {classes.Email}>  
    //                 {n.email}
    //                 </div>
    //     });  

return (
    <div className={classes.Order}>
        {/* <div className= {classes.Name}>
          <b> customer:  {customerName} </b>  
        </div> */}
        <p> <b>Ingredients:</b>  
            {ingredientOutput}
        </p>         
        <p> <b>Price: </b> 
            <strong> {Number.parseFloat(props.price).toFixed(2)} USD</strong>
        </p> 
        
        {/* {customerEmail} */}
        <Button btnType="Danger" clicked={cancle} >CANCEL</Button>
        <Button btnType="Success" clicked={finished} >FInished</Button>
    </div>
);    
} 
export default order;
 