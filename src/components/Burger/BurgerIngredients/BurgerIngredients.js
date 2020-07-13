import React from 'react';

import classes from './BurgerIngredients.module.css';   
//import PropsTypes from 'prop-types';

 const  BurgerIngredients = props => {
    
     let ingredient = null;

     switch(props.type){
         case('bread-bottom'):
            ingredient= <div className={classes.BreadBottom}></div>;
         break;
         
         case('bread-top'):
            ingredient= (
             <div className={classes.BreadTop}>
                 <div className={classes.seeds1}> </div>
                 <div className={classes.seeds2}> </div>
             </div>
         );
         break;
         
         case('meat'):
            ingredient = <div className={classes.Meat} > </div>;
         break;
        
         case('cheese'):
         ingredient = <div className={classes.Cheese} > </div>;
         break;

         case('salad'):
         ingredient = <div className={classes.Salad} > </div>;
         break;
         case('tometo'):
         ingredient = <div className={classes.Tometo} > </div>;
         break;
         
         case('pickle'):
         ingredient = <div className={classes.Pickle} > </div>;
         break;


         default : 
         ingredient=null;
      
     }
     return ingredient;

    };
  

//  BurgerIngredients.prototype= {
//     type: PropsTypes.string.isRequired,
//      writable: true
//  };

export default BurgerIngredients;