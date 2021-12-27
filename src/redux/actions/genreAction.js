import { ActionTypes } from '../constant/action-types'

export const genreAction = (genreData) => {
    console.log('genre action', genreData)
    return {
        type: ActionTypes.SETGENRELIST,
        payload: genreData
    }
}
export const addGenres = (genreData) => {
    console.log('genres action', genreData)
    return {
        type: ActionTypes.ADDGENRELIST,
        payload: genreData
    }
}