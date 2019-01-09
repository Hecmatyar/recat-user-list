import {ThunkAction} from "redux-thunk";
import {IAppState} from "../core/store/appState";

export type SimpleThunk = ThunkAction<void, IAppState, Error>;