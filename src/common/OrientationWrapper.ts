import Device from "react-native-device-detection";
import {default as Orientation, OrientationType} from "react-native-orientation";

export class OrientationWrapper {
    static addSpecificOrientationListener(handler: (orientation: OrientationType) => void): void {
        if (Device.isTablet && Device.isIos) {
            Orientation.addSpecificOrientationListener(handler);
        }
    }

    static removeSpecificOrientationListener(handler: (orientation: OrientationType) => void): void {
        Orientation.removeSpecificOrientationListener(handler);
    }
}