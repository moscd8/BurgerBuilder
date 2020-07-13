import React  from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxility/Auxiliry';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent , axios)=>{
    return props => { 
        const [error, clearError]=useHttpErrorHandler(axios);
//         const [error, setError] = useState(null);
 
       
//         const reqInterceptor= axios.interceptors.request.use(req=>{
//                 //console.log(req)
//                 setError(null);
//                 return req;

//             })

//         const resInterceptor= axios.interceptors.response.use(res=> res,err =>{
//                 console.log(err)
// //                this.setState({error:error})
//                 setError(err);

//             })
       
//         useEffect(()=> {
//             return ()=> {
//                 axios.interceptors.request.eject( reqInterceptor);
//                 axios.interceptors.response.eject( resInterceptor);
//             };
//         }, [reqInterceptor,resInterceptor]);

//        // componentWillUnmount(){
//             //in order to avoid memory leak, we need to ejcet component which dont relvant after code executed
//             // console.log('Will unMount', this.reqInterceptor, this.resInterceptor)
//             // axios.interceptors.request.eject(this.reqInterceptor);
//             // axios.interceptors.response.eject(this.resInterceptor);
//        // }

//        const  errorConfirmedHandler = () => {
//             //this.setState({error:null})
//             setError(null);
//         } 

            return(
                <Aux > 
                <Modal show ={error} modalClosed={clearError}>
                    <p>Something didn't work! </p>
                    {error ? error.message: null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
            )
        } 
}
export default withErrorHandler;