import React, {PureComponent} from "react";
import {Image, View} from "react-native";
import Device from "react-native-device-detection";
import {appSettingsProvider} from "../../core/settings";
import {getWindowHeight, getWindowWidth} from "../../core/theme/common";
import {CommonStyles} from "../../core/theme/commonStyles";
import {CustomResources} from "../ImageResources.g";

export class Splash extends PureComponent {
    render(): JSX.Element | null {
        if (Device.isAndroid) {
            return null;
        } else {
            const useDefaultSource = appSettingsProvider.settings.environment != "Development" && __DEV__;

            return (
                <View style={CommonStyles.flex1}>
                    <Image
                        style={{width: getWindowWidth(), height: getWindowHeight()}}
                        defaultSource={useDefaultSource ? CustomResources.splash : undefined}
                        source={CustomResources.splash}
                        resizeMode={"cover"}
                    />
                </View>
            );
        }
    }
}