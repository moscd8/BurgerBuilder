import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shered/utility';
// import { purchaseBurgerFail, purchaseBurgerSuccess } from '../../shered/utility';
 
const initialState ={
    orders: [],
    loading: false,
    purchased: false
}


const purchaseBurgerSuccessFunc = (state,action) => {
        const newOrder = updateObject(action.orderData, {id: action.orderId});
        return updateObject(state,{
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true
        });
}

const purchaseBurgerStartFunc = (state,action) =>{
    return updateObject(state,{loading:true})
}

const purchaseBurgerFailFunc = (state,action) =>{
    return updateObject(state,{loading:false});
}

const fetchOrdersStartFunc = (state,action) =>{
    return updateObject(state,{loading:true});
}

const fetchOrdersSuccessFunc = (state,action) =>{
    return updateObject(state,{
        orders: action.orders,
        loading: false
    });
}
 
const fetchOrdersFailFunc = (state,action) =>{
    return updateObject(state,{loading:false});
}
 
const reducer = (state= initialState,action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStartFunc(state,action)
           
            // return{
            //     ...state,
            //     loading: true
            // };

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccessFunc(state,action);
     
            // const newOrder= {
            //     ...action.orderData,
            //     id: action.orderId
            // };

            // return{
            //         ...state,
            //         loading: false,
            //         orders: state.orders.concat(newOrder),
            //         purchased: true
            //     };

        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFailFunc(state,action);
            
            // return{
            //     ...state,
            //     loading: false
            // };

        case actionTypes.PURCHASE_INIT:
            return updateObject(state,{purchased:false});
            // return{
            //     ...state,
            //     purchased: false
            // };
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStartFunc(state,action);
            
            // return{
            //     ...state,
            //     loading: true
            // };
        case actionTypes.FETCH_ORDERS_SUCCESS:  return fetchOrdersSuccessFunc(state,action);

            // return{
            //     ...state,
            //     orders: action.orders,
            //     loading: false
            // };
        
        case actionTypes.FETCH_ORDERS_FAIL:   return fetchOrdersFailFunc(state,action);
            
            // return{
            //     ...state,
            //     loading: false
            // };
        

            default: return state;
    }

}
export default reducer;
