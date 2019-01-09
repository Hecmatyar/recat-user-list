import React, {PureComponent} from "react";
import {Image, ImageStyle, ImageURISource} from "react-native";
import {styleSheetCreate} from "../utils/styleSheetCreate";

interface IProps {
    imageSource: ImageURISource;
    imageSourceFocused: ImageURISource;
    isFocused: boolean;
}

export class TabBarIcon extends PureComponent<IProps> {
    render(): JSX.Element {
        const {isFocused, imageSource, imageSourceFocused} = this.props;
        const style = styles.image;
        const image = isFocused ? imageSourceFocused : imageSource;

        return <Image resizeMode="stretch" style={style} source={image} defaultSource={imageSource}/>;
    }
}

const styles = styleSheetCreate({
    image: {
        height: 24,
        width: 24,
        resizeMode: "contain",
        marginTop: 7,
    } as ImageStyle
});
