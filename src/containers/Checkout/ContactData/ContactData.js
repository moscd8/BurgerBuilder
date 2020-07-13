import React,{ useState } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Forms/Input'
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject,checkValidity } from '../../../shered/utility';


const ContactData = props => {
  const [orderForm, setorderForm] = useState ({ 
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            }, 

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipcode'
                },
                value: '',
                validation: { 
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    option:[{value: 'fastest' , displayValue:'Fastest'},
                            {value: 'cheapest' , displayValue:'Cheapest'}
                            ]
                },
                value: 'cheapest',
                valid:true,validation: {
                  
                },
            }
            // ,
            // timeOrderd: new Date().getTime().toString() 

    });

  const [fromIsValid,setfromIsValid] = useState(false);

   const  orderHandler = (event)=>{
        event.preventDefault();
        
       // this.setState({loading:true});

        const formData = {};
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier]= orderForm[formElementIdentifier].value;

        }
         
        const order= {
            ingredients: props.ings,
            price : props.price,
            orderData: formData,
            userId: props.userId           
        }
        console.log("props.token: ");
        console.log(props.token);
        props.onOrderBurger(order,props.token);

    }

    // checkValidity(value,rules) {
    //     let isValid = true;
        
    //     if(rules.required){
    //         isValid= isValid && value.trim() !== '';
    //     }

    //     if(rules.minLength){
    //         isValid= isValid && value.length >= rules.minLength
    //     }

    //     if(rules.maxLength){
    //         isValid=isValid &&  value.length <= rules.maxLength
    //     }

    //     return isValid;
    // }

    const inputChangedHandler = (event, inputIdentifier)=> {
       // console.log(event.target.value)
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // }; //copy all orders.

        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }; // copy the spacific element 

        // updatedFormElement.value= event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // updatedFormElement.touched =true;
        // updatedOrderForm[inputIdentifier]= updatedFormElement;
        // console.log(updatedFormElement)

        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // }; //copy all orders.

        const updatedFormElement = updateObject(orderForm[inputIdentifier],{
            value:event.target.value,
            valid: checkValidity(event.target.value,orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier]: updatedFormElement
        });

        let fromIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            fromIsValid = updatedOrderForm[inputIdentifier].valid && fromIsValid;
        }
        setorderForm(updatedOrderForm);
        setfromIsValid(fromIsValid); 

    }  
 
        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        let form= (
            <form onSubmit={orderHandler}>  
                    {formElementsArray.map(formElement => (
                        <Input key={formElement.id}
                               elementType={formElement.config.elementType}  
                               elementConfig={formElement.config.elementConfig} 
                               value={formElement.config.value} 
                               invalid= {!formElement.config.valid}
                               shouldValidate={formElement.config.validation}
                               touched={formElement.config.touched}
                               change={ (event) => inputChangedHandler(event,formElement.id )}/>
                    ))}
                    {/* <Input inputype="input" type="text" name="name" placeholder="Your Name" />
                    <Input inputype="input" type="email" name="email" placeholder="Your Email" /> 
                    <Input inputype="input" type="text" name="street" placeholder="Your Street" /> 
                    <Input inputype="input" type="text" name="postalCode" placeholder="Your postalCode" />  */}
                     
                    <Button btnType="Success" disabled={!fromIsValid}> ORDER </Button>
                </form>
        );
        if( props.loading){
            form= <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter You Contact Data</h4>
                {form}
            </div>
        )
 

};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {    
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ContactData,axios));