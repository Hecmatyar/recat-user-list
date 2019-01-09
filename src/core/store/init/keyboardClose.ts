import {Keyboard} from "react-native";
import Device from "react-native-device-detection";
import {Dispatch} from "react-redux";
import {applyMiddleware, Middleware} from "redux";
import {ReduxStack} from "redux-stack";
import {isType} from "typescript-fsa";
import {IAppState} from "../appState";
import {CoreActions} from "../coreActions";

function createMiddleware(): Middleware {
    let keyboardIsOpen = false;

    if (Device.isAndroid) {
        Keyboard.addListener("keyboardDidShow", () => keyboardIsOpen = true);
        Keyboard.addListener("keyboardDidHide", () => keyboardIsOpen = false);
    } else {
        Keyboard.addListener("keyboardWillShow", () => keyboardIsOpen = true);
        Keyboard.addListener("keyboardWillHide", () => keyboardIsOpen = false);
    }

    return function (): (next: Dispatch<IAppState>) => Dispatch<IAppState> {
        return (next: Dispatch<IAppState>): Dispatch<IAppState> => {
            return (action: any): any => {
                if (keyboardIsOpen && isType(action, CoreActions.navigate)) {
                    Keyboard.dismiss();
                }

                return next(action);
            };
        };
    };
}

export const keyboardDismissOnNavigation: ReduxStack = {
    enhancers: [applyMiddleware(createMiddleware())]
};
