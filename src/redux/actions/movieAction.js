import { ActionTypes } from '../constant/action-types'

export const movieAction = (movieData) => {
    console.log('movie action', movieData)
    return {
        type: ActionTypes.SETMOVIELIST,
        payload: movieData
    }
}

export const addMovieAction = (movieData) => {
    return {
        type: ActionTypes.ADDMOVIELIST,
        payload: movieData
    }
}
export const movieSingleAction = (movieData) => {
    return {
        type: ActionTypes.GETSINGLEDATA,
        payload: movieData
    }
}