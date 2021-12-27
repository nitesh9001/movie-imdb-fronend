import { ActionTypes } from '../constant/action-types'

const initalState = {
   searchkey :''
}

export const searchReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.SEARCHDATA :
            return {...state, searchkey: payload};
        default :
        return state;
    }
}
