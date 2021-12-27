import axios from 'axios';
import { apiEndPoint, headerAuth } from "../utlis/genric";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import { movieSingleAction ,movieAction } from "../redux/actions/movieAction";
import { searchAction } from '../redux/actions/searchAction';

export const getSingleMovies = ( dispatch, requestBody, setSingleMovie ) => { 
    axios.post(`${apiEndPoint}/movie/list`,
    requestBody
    ).then(response => {
        console.log(response?.data)
        if(response?.data?.success === true){
            dispatch(movieSingleAction(response?.data?.data));
            setSingleMovie(response?.data?.data);
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
        console.log('error looged in Movie', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    })
}

export const getMovies = ( dispatch, requestBody, setTypeFilter ) => { 
    axios.post(`${apiEndPoint}/movie/list`,
    requestBody
    ).then(response => {
        console.log(response?.data)
        if(response?.data?.success === true){
            dispatch(movieAction(response?.data?.data));
            // setSingleMovie(response?.data?.data);
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
        console.log('error looged in movie', err);
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
        setTypeFilter(false)
    })
}

export const addMovies = ( dispatch, requestBody, setSaveClicked) => {
    console.log("request body movie", requestBody)
    axios.post(`${apiEndPoint}/movie`,
    requestBody,
    {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": localStorage.getItem("jwt-token-login")
        }
    }
    ).then(response => {
        if(response?.data?.success === true){
            // dispatch(movieAction(response?.data?.data));
            dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: 'Movies added successfully',
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
        console.log('error looged in movie', err);
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
        setSaveClicked(false);
        window.location.href = '/';
    })
}

export const updateMovies = ( id, dispatch, requestBody, setSaveClicked ) => {
    console.log("request body movie", requestBody)
    axios.patch(`${apiEndPoint}/movie/${id}`,
    requestBody,
    {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": localStorage.getItem("jwt-token-login")
        }
    }
    ).then(response => {
        if(response?.data?.success === true){
            // dispatch(movieAction(response?.data?.data));
            dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: 'Movies Updated successfully',
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
        console.log('error looged in movie', err);
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
        setSaveClicked(false);
        window.location.href = '/';
    })
}

export const delMovies = ( dispatch, requestId ) => { 
    axios.delete(`${apiEndPoint}/movie/${requestId}`,
    headerAuth(true)
    ).then(response => {
        console.log(response?.data)
        if(response?.data?.success === true){
             dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: 'Deleted the movie',
                },
            }))
            // setSingleMovie(response?.data?.data);
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
        console.log('error looged in delMovies', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(() => {
        getMovies(dispatch, {});
        window.location.reload();
    })
}

export const searchMovies = (dispatch, data ) => {
    dispatch(searchAction(data));
}

