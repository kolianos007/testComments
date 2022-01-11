import { combineReducers } from "redux";
import comments from "./commentsReducer";
import profile from './profile';

const rootReducer = combineReducers({comments, profile});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export default rootReducer;
