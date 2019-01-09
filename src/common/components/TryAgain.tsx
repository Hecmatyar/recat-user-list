import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../utils/styleSheetCreate";
import {Colors} from "../../core/theme/colors";

interface IProps {
    onPress: () => void;
    errorText?: string;
}

export class TryAgain extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.errorText}</Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.textTryMore}>{"Ошибка. Попробовать еще раз."}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center"
    } as ViewStyle,
    text: {
        color: Colors.black,
        textAlign: "center",
        fontSize: 17
    } as TextStyle,
    textTryMore: {
        color: Colors.black,
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 17
    } as TextStyle
});