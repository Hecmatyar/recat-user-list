import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {OrientationType} from "react-native-orientation";
import {getWindowHeight, getWindowWidth} from "../../core/theme/common";
import {OrientationWrapper} from "../OrientationWrapper";

export function styleSheetFlatten(style1: ViewStyle | TextStyle | ImageStyle, style2: ViewStyle | TextStyle | ImageStyle): ViewStyle {
    return StyleSheet.flatten([style1, style2]) as any;
}

export function styleSheetCreate<T>(styles: T): T {
    return StyleSheet.create(styles as any) as any;
}

let orientation: OrientationType = "PORTRAIT";
OrientationWrapper.addSpecificOrientationListener((o) => orientation = o);

const cache = new Map<OrientationType, Map<any, any>>();

export function createStyle<T>(creator: (info: ICreateStyleInfo) => T): () => T {
    return (): T => {
        let innerCache = cache.get(orientation);
        if (innerCache == null) {
            innerCache = new Map();
            cache.set(orientation, innerCache);
        }

        const cachedValue = innerCache.get(creator);
        if (cachedValue != null) {
            return cachedValue;
        } else {
            const value = creator({height: getWindowHeight(), width: getWindowWidth(), orientation});
            innerCache.set(creator, value);

            return value;
        }
    };
}

interface ICreateStyleInfo {
    orientation: OrientationType;
    width: number;
    height: number;
}