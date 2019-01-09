import {actionCreator} from "../../core/store/actionCreator";
import {LoadState} from "../../common/loadState";
import {IUser} from "../../types/customAPI";

export class Page2Actions {
    static getUsers = actionCreator.async<LoadState, IUser[], Error>("Page2/UPDATE");
}