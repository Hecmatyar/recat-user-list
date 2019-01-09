import React, {PureComponent} from "react";
import {ImageStyle, Text, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../utils/styleSheetCreate";
import {Colors} from "../../core/theme/colors";

export class EmptySearchResult extends PureComponent {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>Ничего не найдено</Text>
                <View style={styles.empty}/>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    image: {
        width: 110,
        height: 110,
        resizeMode: "contain",
    } as ImageStyle,
    empty: {
        height: 80
    } as ViewStyle

});