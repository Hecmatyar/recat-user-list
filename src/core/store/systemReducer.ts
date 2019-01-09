import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {IAppState} from "./appState";
import {CoreActions} from "./coreActions";
import {SystemActions} from "./systemActions";
import {ISystemState, SystemInitialState} from "./systemState";

function rehydrateHandler(state: ISystemState, rehydratedState: IAppState): ISystemState {
    return newState(rehydratedState.system || state, {});
}

function setTokenHandler(state: ISystemState, token: string): ISystemState {
    return newState(state, {authToken: token});
}

export const systemReducer = reducerWithInitialState(SystemInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(SystemActions.setToken, setTokenHandler)
    .build();