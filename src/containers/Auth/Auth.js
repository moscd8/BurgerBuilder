import React ,{  useState, useEffect } from 'react';
import Input from '../../components/UI/Forms/Input';
import Buttom from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect} from 'react-router-dom';
import { updateObject, checkValidity } from '../../shered/utility';

const  Auth = props => {

   const [authForm,setAuthForm]=useState({ 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true 
                },
                valid:false,
                touched:false
            }, 
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false
            }, 
      
        });

    const [isSignup,setIsSignup]=useState(true);
  
    const {buildingBurger,authRedirectPath, onSetAuthRedirectPath}= props;
    useEffect(()=> {
        if(!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    // componentDidMount(){
    //     if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

    // checkValidity(value,rules) {
    //     let isValid = true;
        
    //     if(rules.required){
    //         isValid= value.trim() !== '' && isValid;
    //     }

    //     if(rules.minLength){
    //         isValid= value.length >= rules.minLength && isValid ;
    //     }

    //     if(rules.maxLength){
    //         isValid= value.length <= rules.maxLength && isValid;
    //     }
    //     // if (rules.isEmail) {
    //     //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //     //     isValid = pattern.test(value) && isValid
    //     // }

    //     // if (rules.isNumeric) {
    //     //     const pattern = /^\d+$/;
    //     //     isValid = pattern.test(value) && isValid
    //     // }

    //     return isValid;
    // }

    const inputChangedHandler = (event,controlName) => {
        // const updateControls={
        //     ...this.state.controls,
        //     [controlName]:{
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     }
        // };
        const updateControls= updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName],
                {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, authForm[controlName].validation),
                    touched: true                
                })
        })
        setAuthForm(updateControls);
//        this.setState({controls: updateControls})
    }

    const submitHandler = (event) => {
        event.preventDefault ();
        props.onAuth(authForm.email.value,authForm.password.value, authForm.isSignup);
    }

    const switchAuthModeHandler = () => {
      setIsSignup(!isSignup);
        // this.setState(prevState => {
        //     return {isSignup: !prevState.isSignup};
        // })
    }

    //render(){
        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push({
                id: key,
                config: authForm[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}  
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                invalid= {!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                change={ (event) => inputChangedHandler(event,formElement.id )}
            />
        ))

        if(props.loading){
            form= <Spinner />
        } 
        
        let errorMessage= null;
        if(props.error){
            errorMessage= (<p> {props.error.message} </p>);
        }

        let authredirect= null;
        if(props.isAuthenticated){
            authredirect= <Redirect to={props.authRedirectPath}/>
        }
 
 
        return (
            <div className={classes.Auth}> 
                {errorMessage}  
                {authredirect}
                <form onSubmit={submitHandler}>
                    {form}
                    <Buttom btnType="Success"> SUBMIT</Buttom>
                    <Buttom btnType="Danger" clicked={switchAuthModeHandler}>Switch To {!isSignup? "SignUp" : "SignIn"}</Buttom>
                    
                </form>
            </div>
        );
  //  }
}



const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};


const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
