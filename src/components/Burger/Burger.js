 
import React from 'react';    
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

 const burger= (props)=> {             
     let transformIngredients= Object.keys(props.ingredients)   //the ingredients is not an array its an object, therefor we need to transform it to array.
     .map(igKey => {                                            //we first create Array with given ingredients and we will itterate them with map() and create new BurgerIngredients component
         return [...Array(props.ingredients[igKey])]
         .map((_, i) => {
            return <BurgerIngredients key={igKey+ i} type={igKey} />
         });
     })
     .reduce((arr,el) => {
         return arr.concat(el)   //joinng all the empty element into one array 
     }, []);
     
     if (transformIngredients.length ===0)
     {transformIngredients = <p>Please Add ingredients </p>}
     
     return(
         <div className={classes.Burger}>
             <BurgerIngredients type="bread-top"/>
             {/* <BurgerIngredients type="meat"/>
             <BurgerIngredients type="salad"/> */}
             {transformIngredients}
             <BurgerIngredients type="bread-bottom"/>
           
         </div>
     );
}

export default burger;