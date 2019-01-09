import React, {PureComponent} from "react";
import {Text, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils/styleSheetCreate";

interface IProps {
}

export class Page1 extends PureComponent<IProps, IEmpty> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>Page 1</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {} as ViewStyle,
});