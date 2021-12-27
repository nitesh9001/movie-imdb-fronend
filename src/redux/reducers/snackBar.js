import { ActionTypes } from '../constant/action-types'

const initalState = {
    show: false, 
    data: {}
}

export const SNACKBAR_SHOW = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.SNACKBAR_SHOW :
            return {...state, show: payload.show, data: payload.data};
    default :
      return state;
    }
}