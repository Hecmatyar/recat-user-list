import {applyMiddleware} from "redux";
import sagaMiddlewareFactory from "redux-saga";
import {ReduxStack} from "redux-stack";

export const sagaMiddleware = sagaMiddlewareFactory();
export const sagaInit = {
    enhancers: [applyMiddleware(sagaMiddleware)],
} as ReduxStack;
