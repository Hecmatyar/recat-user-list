import {combineReducers} from "redux";
import {page2Reducer} from "../../modules/page2";
import {IAppState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";

export function createMainReducer(): any {

    const reducers: Reducers<IAppState> = {
        system: systemReducer,
        page2: page2Reducer
    };

    return combineReducers(reducers);
}