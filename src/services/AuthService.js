import {login, register, watchLater} from "../redux/actions/authAction";
import axios from 'axios';
import { apiEndPoint, headerAuth } from "../utlis/genric";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import storage from "redux-persist/lib/storage";

export const doLogin = (dataAuth, dispatch, setIsErrorC, setButtonClicked) => {
    dispatch(watchLater(''));
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
    dispatch(watchLater(''));
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

export const getWatchLater = ( dispatch, setTypeFilterF ) => { 
    axios.get(`${apiEndPoint}/auth/watchlater`,
      headerAuth(true)
    ).then(response => {
        if(response?.data?.success === true){
            dispatch(watchLater(response?.data?.data));
        }
        else{
            dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "error",
                duration: 3000,
                message: response?.data?.message,
                },
            }))
        }
    }).catch((err) => {
        console.log('error looged in genre', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(()=> {
       setTimeout(() => {
         setTypeFilterF(false);
    }, 1000);
    })
}

export const addWatchLater = ( dispatch, movie_id, setTypeFilterF ) => { 
    axios.post(`${apiEndPoint}/auth/watchlater`,
      movie_id,
      headerAuth(true)
    ).then(response => {
        if(response?.data?.success === true){
             dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: response?.data?.message,
                },
            }))
        }
        else{
            dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "error",
                duration: 3000,
                message: response?.data?.message,
                },
            }))
        }
    }).catch((err) => {
        console.log('error looged in genre', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(()=> {
       setTimeout(() => {
         setTypeFilterF(false);
    }, 1000);
    })
}

export const addLocalWatchLater = async ( dispatch, movie_id,watchLaterData, setTypeFilterF ) =>{
    if(movie_id){
        var found=false;
        var data = watchLaterData;
        console.log(movie_id,"hjh",data);
        await data.forEach(d => {
         console.log(movie_id,"hjh",d);
           if(d?._id === movie_id?._id){
               found=true;
               console.log('founded')
           }else{
               found=false
           }
        })
        if(!found){
            data.push(movie_id)
        }else{
             dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: "Alreday added",
                },
           })
           )
        }
       dispatch(watchLater(data));
    }
    setTimeout(() => {
         setTypeFilterF(false);
    }, 1000);
}

export const removeLocalWatchLater = ( dispatch, movie_id,watchLaterData, setTypeFilterF ) =>{
    if(movie_id){
        const data = watchLaterData.filter(d => d?._id?.toString() !== movie_id)
        dispatch(watchLater(data));
    }
    setTimeout(() => {
         setTypeFilterF(false);
    }, 1000);
}

export const getWatchLaterGuest = (dispatch, watchLaterData) => {
        if(watchLaterData){
            dispatch(watchLater(watchLaterData));
        }
}
