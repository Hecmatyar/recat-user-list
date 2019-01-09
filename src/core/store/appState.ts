import {IPage2State, Page2InitialState} from "../../modules/page2/page2State";
import {ISystemState, SystemInitialState} from "./systemState";

export interface IAppState {
    system: ISystemState;
    page2: IPage2State;
}

export function getAppInitialState(): IAppState {
    const AppInitialState: IAppState = {
        system: SystemInitialState,
        page2: Page2InitialState
    };

    return AppInitialState;
}