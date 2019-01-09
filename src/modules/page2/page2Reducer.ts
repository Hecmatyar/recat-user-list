import {Success} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {Page2Actions} from "./page2Actions";
import {IPage2State, Page2InitialState} from "./page2State";
import {DEFAULT_PAGE_SIZE} from "../../common/helpers/calculatePage";
import {LoadState} from "../../common/loadState";
import {IUser} from "../../types/customAPI";
import _ from "lodash";

function getUsersStartedHandler(state: IPage2State, loadingState: LoadState): IPage2State {
    return newState(state, {loadingState});
}

function getUsersDoneHandler(state: IPage2State, {params: _loadState, result: _users}: Success<LoadState, IUser[]>): IPage2State {
    const current = state.users;
    let users: IUser[];
    let loadingState: LoadState;
    if (current.length == 0) {
        loadingState = LoadState.idle;
        users = _users;
    } else {
        if (_loadState == LoadState.loadingMore) {
            users = [...current];
            users = _.uniqBy(users.concat(_users), i => i.id.value);
            loadingState = _users.length < DEFAULT_PAGE_SIZE ? LoadState.allIsLoaded : LoadState.idle;
        } else {
            users = _users;
            loadingState = LoadState.idle;
        }
    }

    return newState(state, {users, loadingState});
}

function getUsersFailedHandler(state: IPage2State): IPage2State {
    return newState(state, {loadingState: LoadState.error});
}

export const page2Reducer = reducerWithInitialState(Page2InitialState)
    .case(Page2Actions.getUsers.started, getUsersStartedHandler)
    .case(Page2Actions.getUsers.done, getUsersDoneHandler)
    .case(Page2Actions.getUsers.failed, getUsersFailedHandler)
    .build();