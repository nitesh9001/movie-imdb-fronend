import { ActionTypes } from '../constant/action-types'

const initalState = {
    movie: [],
    singleMovie: []
}

export const movieReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.SETMOVIELIST :
            return {...state, movie: payload};
        case ActionTypes.ADDMOVIELIST :
            return {...state};
        case ActionTypes.GETSINGLEDATA :
            return {...state,  singleMovie: payload};
        
    default :
      return state;
    }
}
