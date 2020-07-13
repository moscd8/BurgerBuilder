
import * as actionTypes from '../actions/actionTypes';  
import {updateObject } from '../../shered/utility';


const initialState ={
    ingredients: null,
    totalPrice: 4,
    error: false, 
    building: false
};

const INGREDIENTS_PRICE= {
    salad: 0.123,
    meat:2.5,
    tometo:0.15,
    pickle:0.05,

};

const addIngredient= (state, action ) => {

    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients,updateIngredient)
    const updatedState= {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state,updatedState);
};


const removeIngredient= (state, action ) => {
    const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    console.log(updateIng)
    const updateIngs = updateObject(state.ingredients,updateIng)
    const updatedSt= {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
        building:true
    } 
    console.log(updatedSt)
    return updateObject(state,updatedSt);

};

const setIngredient = (state, action ) => {
    return updateObject(state,{
        ingredients: {
                    salad:  action.ingredients.salad,
                    meat:   action.ingredients.meat,
                    tometo: action.ingredients.tometo,
                    pickle: action.ingredients.pickle
                },
            error: false ,
            totalPrice: 4,
            building:false
    });
};


const reducer = (state = initialState, action) => {

    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:  return addIngredient(state,action);
             // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice +  INGREDIENTS_PRICE[action.ingredientName]
            // };
            //return updateObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENTS:  return removeIngredient(state,action);
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            // };
        case  actionTypes.SET_INGREDIENTS:  return setIngredient(state,action);
          
            // return {
            //     ...state,
            //     ingredients: {
            //         salad:  action.ingredients.salad,
            //         meat:   action.ingredients.meat,
            //         tometo: action.ingredients.tometo,
            //         pickle: action.ingredients.pickle
            //     },
            //     error: false ,
            //     totalPrice: 4
            // };
        case actionTypes.FETCH_INGREDIENTS_FAILED:  return updateObject(state,{error:true });
        // return{
            //     ...state,
            //     error: true
            // };
    }

    return state;
}

export default reducer;