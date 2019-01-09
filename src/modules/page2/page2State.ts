import {IUser} from "../../types/customAPI";
import {LoadState} from "../../common/loadState";

export interface IPage2State {
    users: IUser[];
    loadingState: LoadState;
}

export const Page2InitialState: IPage2State = {
    users: [],
    loadingState: LoadState.needLoad
};