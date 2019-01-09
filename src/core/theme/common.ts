import {Dimensions, Platform, StatusBar} from "react-native";
import Device from "react-native-device-detection";

export const isOldDroid = Device.isAndroid && Platform.Version <= 20 /* 4.4.4 */;
export const isAndroidAndLollipopOrHigher = Device.isAndroid && Platform.Version >= 21;

const defaultPhoneWindowWidth = 375;

export function getWindowWidth(): number {
    return Dimensions.get("window").width;
}

export function getWindowHeight(): number {
    const windowDimensions = Dimensions.get("window");

    return windowDimensions.height - (Device.isAndroid ? StatusBar.currentHeight || 0 : 0);
}

export function getPhoneWindowScale(): number {
    return Dimensions.get("window").width / defaultPhoneWindowWidth;
}

export function getScreenTabInitialLayout(): { height: number, width: number } {
    return {height: 0, width: getWindowWidth()};
}

export function getMenuWidth(): number {
    return getWindowWidth() - getWindowWidth() * 0.2;
}
