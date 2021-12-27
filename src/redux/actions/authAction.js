import { ActionTypes } from '../constant/action-types'

export const login = (authData) => {
    console.log('auth action', authData)
    return {
        type: ActionTypes.LOGIN,
        payload: authData
    }
}

export const register = (authData) => {
    console.log('regsiter auth action', authData)
    return {
        type: ActionTypes.REGISTER,
        payload: authData
    }
}

