import { ActionTypes } from '../constant/action-types'

const initalState = {
    genre: [],
}

export const genreReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.SETGENRELIST :
            return {...state, genre: payload};
        case ActionTypes.ADDGENRELIST :
            return {...state};
    default :
      return state;
    }
}
