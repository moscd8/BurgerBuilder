import React, { useState, useEffect, useCallback} from 'react';  
import Aux from '../../hoc/Auxility/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect , useDispatch,useSelector} from 'react-redux';
import * as actions from '../../store/actions/index'; 

// const INGREDIENTS_PRICE= {
//     salad: 0.123,
//     meat:2.5,
//     tometo:0.15,
//     pickle:0.05,
    
// }

const BurgerBuilder = props => {
    // constructor(props){
    //     super(props);

    // }
//     state={
// //        ingredients: null,
//         //  fetched from firebase
//         // {  
//         //     salad: 0,
//         //     meat: 0,
//         //     tometo:0,
//         //     pickle:0

//         // },
// //      totalPrice: 4,
// //        purchasable:false,
//         purchasing: false
//         //,
//         // loading: false,
//         // error:false
//     }

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
   

    const ings = useSelector(state=> {
        return state.burgerBuilder.ingredients;
    });
    const price = useSelector(state=>state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    


    const onIngredientsAdded = (ingName) => dispatch(actions.addingIngredients(ingName));
    const onIngredientsRemoved = (ingName) => dispatch(actions.removeIngredients(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()) , []); // callBack allow us to dispatch only once the initIngredients when BurgerBuilder is created. if we remove to CallBack we will get inifinate loop
    const onInitPurchase = () => dispatch(actions.purchaseInit() );
    const onSetAuthRedirectPath = (path) => dispatch (actions.setAuthRedirectPath(path));


//    const {onInitIngredients} = props;

    useEffect(() => {
        onInitIngredients();
    },[onInitIngredients]);

    // componentDidMount=()=>{ 
    //     this.props.onInitIngredients();
     
    // }

    const purchasingHandler = () =>{
        if(isAuthenticated){
          //  this.setState({purchasing:true});   
            setPurchasing(true);         
        }else {
           onSetAuthRedirectPath('/checkout');
           props.history.push('/auth');

        }
            

    } 

    
   const  updatePurchaseState = (updateedIngredint)=> {
        const currentIngredients= {...updateedIngredint}; 
        const sum= Object.keys(currentIngredients).map(key => {
            return currentIngredients[key];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
 
        return sum>0;

    }/**/

/*
    addIngredientHandler= (type) => {
        const oldCount= this.state.ingredients[type];
        const newCount= oldCount +1;
        const updateedIngredint= {
            ...this.state.ingredients
        };
        updateedIngredint[type]=newCount;
        const priceAddition=INGREDIENTS_PRICE[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice+priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updateedIngredint});
        this.updatePurchaseState(updateedIngredint);
    }

    removeIngredientHandler= (type) => {
        const oldCount= this.state.ingredients[type];
        if(oldCount=== 0){
            console.log('Error Ingreidents with type: '+ type + ' is empty')
            return;
        }
 
        const newCount= oldCount -1;
        const updateedIngredint= {
            ...this.state.ingredients
        };
        updateedIngredint[type]=newCount;
        const priceAddition=INGREDIENTS_PRICE[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice-priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updateedIngredint});
        this.updatePurchaseState(updateedIngredint);
        
    }
    */

    const purchaseCancelHandler = () => {
//        this.setState({purchasing:false});
        setPurchasing(false);
    }

    const purchaseContinuelHandler = () => {
        /*
        const queryParams= [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push('price=' + this.props.price )
        const queryString= queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        })*/
        onInitPurchase();
        props.history.push('/checkout');
        
    }

    // render(){
        const disabledInfo = {  
            ...ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0; 
        } //output: meat:true,salad:false
        
        let orderSummary= null;

        let burger= error ? <p>Ingreidents Can't be loaded!</p> : <Spinner />;
        if(ings){
            burger= (
                <Aux>
                <Burger ingredients={ings} />
                <BuildControls 
                    ingredientsAdded={onIngredientsAdded}
                    ingredientsRemove={onIngredientsRemoved}
                    disabled={disabledInfo}
                    sum={price}
                    purchasable={updatePurchaseState(ings)}
                    ordered= {purchasingHandler}
                    isAuth={isAuthenticated}
                />
                </Aux>
        );
            orderSummary=
                <OrderSummary ingredients={ings} purchaseCanceled={purchaseCancelHandler} 
                              purchaseContinue={purchaseContinuelHandler} totalPrice={price}/>; 
        
            // if(this.state.loading){
            //     orderSummary= <Spinner/>; 
            // }
        }
        return (        
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
              {orderSummary}
             </Modal>
             {burger}
        </Aux>
        );
   //}
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price : state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     };
// }

// const mapDIspatchToProps = dispatch => {
//     return {
//        onIngredientsAdded : (ingName) => dispatch(actions.addingIngredients(ingName)),
//        onIngredientsRemoved : (ingName) => dispatch(actions.removeIngredients(ingName)),
//        onInitIngredients: () => dispatch(actions.initIngredients() ),
//        onInitPurchase: () => dispatch(actions.purchaseInit() ),
//        onSetAuthRedirectPath: (path) => dispatch (actions.setAuthRedirectPath(path))
//     };
// }

// export default connect (mapStateToProps,mapDIspatchToProps) (withErrorHandler(BurgerBuilder,axios));

export default withErrorHandler(BurgerBuilder,axios);