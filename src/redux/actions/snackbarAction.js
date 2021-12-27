import { ActionTypes } from '../constant/action-types'

export const SNACKBAR_SHOW = (data) => {
    return {
        type: ActionTypes.SNACKBAR_SHOW,
        payload: data
    }
}