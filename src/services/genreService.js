import axios from 'axios';
import { apiEndPoint, headerAuth } from "../utlis/genric";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import { genreAction } from "../redux/actions/genreAction";

export const getGenre = ( dispatch ) => { 
    axios.get(`${apiEndPoint}/genre`,
    ).then(response => {
        console.log(response?.data)
        if(response?.data?.success === true){
            dispatch(genreAction(response?.data?.data));
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
    })
}

export const addGenre = ( dispatch, data, setButtonClicked, setOpenInput,fetchGenres ) => { 
    axios.post(`${apiEndPoint}/genre`,
    data,
    headerAuth(true)
    ).then(response => {
        if(response?.data?.success === true){
            dispatch(genreAction(response?.data?.data));
            dispatch(SNACKBAR_SHOW({
                show: true,
                data: {
                severity: "success",
                duration: 3000,
                message: 'Genre added successfully',
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
        setButtonClicked(false);
        setOpenInput(false);
        fetchGenres()
    })
}
