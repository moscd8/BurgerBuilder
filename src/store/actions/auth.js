import * as actionTypes from './actionTypes';
import axios from 'axios'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId,idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const logout = (userId,idToken) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT,
        idToken: idToken,
        userId: userId
    };
};

export const checkAuthTimeout = (expiresInTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expiresInTime*1000);
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email,password,isSignup) => {
    return  dispatch=> {
        dispatch(authStart());
        const authData2= {
            email:email,
            password: password,
            returnSecureToken: true
        };    
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChOrS5PvZX17mtl89JUN3xydDYZUc6sCE';
        if(!isSignup){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChOrS5PvZX17mtl89JUN3xydDYZUc6sCE';
        }     

        axios.post(url, authData2)
        .then( response => {
            console.log(response);
            const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.localId,response.data.idToken));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            
        })
        .catch(error => { 
            console.log(error.response.data);
            dispatch(authFail(error.response.data.error) );
        });
    };
};
 

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = ()=> {
    return dispatch =>{
        const token= localStorage.getItem('token');
        if(!token){
            dispatch(logout()); //noToken was found
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date().getDate()){
                dispatch(logout())  //token was found BUT the expirationDate is expired
            }
            else{ // we would like to store the user detail again and run the timeout with the updated expirationDate 
                const userId= localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000) )
            } 
        }
    }
}
