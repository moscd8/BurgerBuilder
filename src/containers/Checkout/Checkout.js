import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux' 

const  Checkout = props =>  {
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    /*
    componentWillMount(){
        const query= new URLSearchParams(this.props.location.search);
        const ingredients= {};
        let price=0;
        for(let param of query.entries()){
            if(param[0]=== 'price'){
                price= +param[1]
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:ingredients,totalPrice:price})
    }*/

    // componentWillMount () {

    //     this.props.onInitPurchase();

    // }

   const  CheckoutCanclledHandler= ()=> {
        props.history.goBack();

    }

    const CheckoutContinuedHandler= ()=>{
        props.history.replace('/checkout/contact-data');
    } 

        let summary= <Redirect to="/"/>;


        if( props.ings ){
            
        const purchaseRedirecr = props.purchased ? <Redirect to="/" /> : null;
            summary= ( 
            <div>
                {purchaseRedirecr}
                <CheckoutSummary ingredients={props.ings} 
                    CheckoutCanclled={CheckoutCanclledHandler} 
                    CheckoutContinued={CheckoutContinuedHandler} />;
                <Route path={props.match.path + '/contact-data'}
                       component={ContactData} />

            </div>
            )
        }
        return summary;
//             <div>
//             <CheckoutSummary ingredients={this.props.ings} 
//                 CheckoutCanclled={this.CheckoutCanclledHandler} 
//                 CheckoutContinued={this.CheckoutContinuedHandler} />;
//             <Route path={this.props.match.path + '/contact-data'}
//             //  render={ (props) => (<ContactData ingredients={this.state.ingredients} price={this.props.price} {...props}/>)}
//                 component={ContactData}
//             />
//   </div>
          
        
    }
     

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit() )
//     }
// }

export default  connect(mapStateToProps)(Checkout);