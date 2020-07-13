import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess= (id,orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail= (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurgerStart= () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START 
    }
}


export const purchaseBurger= (orderData,token) => {
    return dispatch => { 
        dispatch( purchaseBurgerStart() )
        console.log(token);
        console.log(orderData);
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            console.log(response.data)
            dispatch( purchaseBurgerSuccess( response.data.name, orderData))
        })
        .catch(error => {
            console.log("Fail error:")
            console.log(error) 
            dispatch(purchaseBurgerFail(error))
    
        }) ;
    }
}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        orders: orders
    };
};

export const fetchOrderStart = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token,userId) => {
    // console.log(token)
    // console.log(userId)
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams= '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        console.log('https://react-my-burger-c01c0.firebaseio.com/orders.json' + queryParams)
        axios.get('/orders.json' + queryParams)
        .then(res => {
             console.log(res);
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key     
                });
            }
  //          this.setState({loading:true, orders:fetchedOrders});
            dispatch(fetchOrderSuccess(fetchedOrders))        
        })
        .catch(err => {
//            this.setState({loading:false});
        console.log(err);
        dispatch(fetchOrderFail(err))                  
        })
    }
}