import Device from "react-native-device-detection";

export class Fonts {
    static default = Device.isAndroid ? "proximanova-semibold" : "ProximaNova-Semibold";
    // Proxima Nova, ProximaNova-Semibold
}