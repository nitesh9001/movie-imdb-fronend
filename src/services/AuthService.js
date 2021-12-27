import {login, register} from "../redux/actions/authAction";
import axios from 'axios';
import { apiEndPoint, headerAuth } from "../utlis/genric";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import storage from "redux-persist/lib/storage";

export const doLogin = (dataAuth, dispatch, setIsErrorC, setButtonClicked) => {
    
    axios.post(`${apiEndPoint}/auth/login`,  
    dataAuth,
        headerAuth(false)
    ).then(response => {
        console.log(response?.data)
        if(response?.data?.success === true){
            dispatch(login(response?.data?.data));
            localStorage.setItem('jwt-token-login', response?.data?.data?.token)
            dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "success",
            duration: 3000,
            message: "Logined Successfully",
            },
         })
        );
        // 
    }
    else{
       setIsErrorC(true);
       dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: response?.data?.message,
            },
        })
        )  
    }
    setButtonClicked(false);
    }).catch((err) => {
    setButtonClicked(false);
        console.log('error looged in login', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(()=>{
      window.location.reload();
    })
}

export const logout = () => {
    storage.removeItem("persist:root");
    localStorage.clear();
    window.location.href ="/";
    window.location.reload();
}

export const doRegister = (dataAuth, dispatch, setIsErrorC, setButtonClicked) => {
    
    axios.post(`${apiEndPoint}/auth/register`,  
        dataAuth,
        headerAuth(false)
    ).then(response => {
        console.log('d',response?.data);
        if(response?.data?.success === true){
            dispatch(register(response?.data?.data));
            localStorage.setItem('jwt-token-login', response?.data?.data?.token)
            dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "success",
            duration: 3000,
            message: "Registered Successfully",
            },
         })
        );
    }
    else{
       setIsErrorC(true);
       dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: response?.data?.message,
            },
        })
        )  
    }
    setButtonClicked(false);
    }).catch((err) => {
    setButtonClicked(false);
        console.log('error looged in login', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(()=>{
       window.location.reload();
       window.location.reload();
    })
}