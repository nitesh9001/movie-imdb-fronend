import { ActionTypes } from '../constant/action-types'

export const searchAction = (searchData) => {
    console.log('search Data action', searchData)
    return {
        type: ActionTypes.SEARCHDATA,
        payload: searchData
    }
}