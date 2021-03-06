import {REHYDRATE} from "redux-persist/lib/constants";
import {actionCreator} from "./actionCreator";
import {IAppState} from "./appState";

export class CoreActions {
    static rehydrate = actionCreator<IAppState>(REHYDRATE);
    static navigate = actionCreator("Navigation/NAVIGATE");
}
