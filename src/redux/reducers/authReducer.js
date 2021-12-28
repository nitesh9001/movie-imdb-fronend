import { ActionTypes } from '../constant/action-types'

const initalState = {
    user: {},
    watchLater : []
}

export const authReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.LOGIN :
            return {...state, user: payload};
        case ActionTypes.REGISTER :
            return {...state, user: payload};
        case ActionTypes.SETWATCHLATER :
            return {...state, watchLater: payload};
    default :
      return state;
    }
}
