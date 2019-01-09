import React, {PureComponent} from "react";
import {Text, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils/styleSheetCreate";

interface IProps {
}

export class Menu extends PureComponent<IProps, IEmpty> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>MENU</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
});