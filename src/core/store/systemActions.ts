import {actionCreator} from "./actionCreator";

export class SystemActions {
    static setToken = actionCreator<string>("System/SET_TOKEN");
}
