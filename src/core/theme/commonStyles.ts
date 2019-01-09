import {Platform, StyleSheet, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils/styleSheetCreate";
import {Colors} from "./colors";
import {isOldDroid} from "./common";

// noinspection JSSuspiciousNameCombination
export const CommonStyles = styleSheetCreate({
    flex1: {
        flex: 1
    } as ViewStyle,
    whiteContainer: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
    iPhoneXFooter: {
        height: 20
    } as ViewStyle,
    row: {
        flexDirection: "row"
    } as ViewStyle,
    shadow: {
        ...Platform.select({
            ios: {
                shadowOffset: {height: 3, width: 0},
                shadowOpacity: 0.16,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
                borderWidth: isOldDroid ? StyleSheet.hairlineWidth : undefined,
                borderColor: isOldDroid ? Colors.black : undefined
            }
        }),
    },
    shadow2: {
        ...Platform.select({
            ios: {
                shadowOffset: {height: -3, width: 0},
                shadowOpacity: 0.48,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
                borderWidth: isOldDroid ? StyleSheet.hairlineWidth : undefined,
                borderColor: isOldDroid ? Colors.black : undefined
            }
        }),
    },
    gridSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.black
    } as ViewStyle
});