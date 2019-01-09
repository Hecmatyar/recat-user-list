import React, {Component} from "react";
import {SafeAreaView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Header} from "react-navigation";
import {Colors} from "../../core/theme/colors";
import {CommonStyles} from "../../core/theme/commonStyles";
import {Fonts} from "../../core/theme/fonts";
import {styleSheetCreate} from "../utils/styleSheetCreate";

export class UnhandledError extends Component<IProps> {
    render(): JSX.Element {
        const header = this.props.hideHeader ? null : (
            <SafeAreaView style={styles.header}>
                <View style={styles.header}/>
            </SafeAreaView>
        );

        return (
            <View style={styles.container}>
                {header}
                <View style={CommonStyles.flex1}/>
                <Text style={styles.text}>An unexpected error occurred</Text>
                <Text style={styles.text}>We already work on it</Text>
                <View style={styles.separator}/>
                <TouchableOpacity onPress={this.props.onReset}>
                    <Text style={styles.continueText}>Send a report and continue</Text>
                </TouchableOpacity>
                <View style={CommonStyles.flex1}/>
            </View>
        );
    }
}

interface IProps {
    hideHeader?: boolean;
    onReset: () => void;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
    } as ViewStyle,
    text: {
        color: Colors.darkBlueText,
        fontSize: 18,
        fontFamily: Fonts.default
    } as TextStyle,
    separator: {
        margin: 20
    } as ViewStyle,
    continueText: {
        fontFamily: Fonts.default,
        fontSize: 15,
        color: Colors.darkBlueText,
        margin: 10
    } as TextStyle,
    header: {
        height: (Header as any).HEIGHT,
        backgroundColor: Colors.white,
        alignSelf: "stretch"
    } as ViewStyle
});