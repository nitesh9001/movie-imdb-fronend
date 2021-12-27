import { ActionTypes } from '../constant/action-types'

const initalState = {
    user: {},
}

export const authReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.LOGIN :
            return {...state, user: payload};
        case ActionTypes.REGISTER :
            return {...state, user: payload};
    default :
      return state;
    }
}
