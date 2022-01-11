import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { IComment } from '../../types/types';
import { AppStateType } from "../reducers";
import { InferActionsTypes } from "../store";

const commentsActions = {
    fetchComments: () => ({
        type: "FETCH_COMMENTS",
    } as const),
    fetchCommentsSuccess: (comments: IComment[]) => ({
        type: "FETCH_COMMENTS_SUCCESS",
        payload: comments,
    } as const),
    fetchRepliesSuccess: (replies: IComment[]) => ({
        type: "FETCH_COMMENTS_REPLIES_SUCCESS",
        payload: replies,
    } as const),
    fetchCommentsError: (error: any) => ({
        type: "FETCH_COMMENTS_ERROR",
        error,
    } as const),
    updateComment: (isUpdate: boolean) => ({
        type: "UPDATE_COMMENT",
        isUpdate
    } as const),
}  

export const fetchCommentsThunk = (type: "comments" | "replies") => async (dispatch: ThunkDispatch<AppStateType, {}, any>) => {
    dispatch(commentsActions.fetchComments())
    try {
        await axios.get(`/${type}`).then(res => dispatch(type === "comments" ? commentsActions.fetchCommentsSuccess(res.data) : commentsActions.fetchRepliesSuccess(res.data)))
    } catch (error) {
        dispatch(commentsActions.fetchCommentsError(error))
    }
}

export type CommentsActionsType = InferActionsTypes<typeof commentsActions>

export default commentsActions