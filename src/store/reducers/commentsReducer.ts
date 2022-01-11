import { IComment } from "../../types/types";
import { CommentsActionsType } from "../actions/commentsActions";

const initialState = {
    comments: [] as IComment[],
    replies: [] as IComment[],
    isUpdate: false,
    loading: false,
    error: null as any
}

type InitialState = typeof initialState

const products = (state = initialState, action: CommentsActionsType): InitialState => {
    switch(action.type) {
        case "FETCH_COMMENTS":
            return {
                ...state,
                loading: true
            }
        case "FETCH_COMMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                comments: action.payload
            }
        case "FETCH_COMMENTS_REPLIES_SUCCESS":
            return {
                ...state,
                loading: false,
                replies: action.payload
            }
        case "FETCH_COMMENTS_ERROR":
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case "UPDATE_COMMENT":
            return {
                ...state,
                isUpdate: action.isUpdate
            }
        default: 
            return state
    }
}

export default products