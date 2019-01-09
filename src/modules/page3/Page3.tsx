import React, {PureComponent} from "react";
import {Text, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils/styleSheetCreate";

interface IProps {
}

export class Page3 extends PureComponent<IProps, IEmpty> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>THIS IS HIDDEN PAGE</Text>
                <Text>U CAN SEE IT IN DEVELOP MODE ONLY</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {} as ViewStyle,
});