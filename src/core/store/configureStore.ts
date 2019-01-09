import {createStore, Store} from "redux";
import {buildStack} from "redux-stack";
import {IAppState} from "./appState";
import {createMainReducer} from "./createMainReducer";
import {keyboardDismissOnNavigation} from "./init/keyboardClose";
import {reduxLoggerInit} from "./init/loggerInit";
import {promiseInit} from "./init/promiseInit";
import {sagaInit} from "./init/sagaInit";
import {thunkInit} from "./init/thunkInit";

export enum MigrateStoreMode {
    none = "none",
    purge = "purge",
    resetStatePreserveToken = "resetStatePreserveToken",
    resetStateWithToken = "resetStateWithToken"
}

export function configureStore(callback: () => void, options: { migrateMode: MigrateStoreMode }): { store: Store<IAppState> } {
    const {enhancer} = buildStack([
        thunkInit,
        promiseInit,
        sagaInit,
        reduxLoggerInit,
        keyboardDismissOnNavigation]);

    const combinedReducer = createMainReducer();
    const store = createStore<IAppState>(combinedReducer, enhancer);
    // if (options.migrateMode == MigrateStoreMode.purge) {
    //     ignorePromise(persistor.purge());
    // }

    return {store};
}