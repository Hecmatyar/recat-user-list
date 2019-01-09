import React, {PureComponent} from "react";
import {Text} from "react-native";
import {PlaygroundItem} from "./PlaygroundItem";

interface IState {
    stat: number;
    showPaymentView: boolean;
}

export class Playground extends PureComponent<IEmpty, IState> {
    render(): JSX.Element {
        return (
            <PlaygroundItem header={"Playground item"}>
                <Text>Nothing to show</Text>
            </PlaygroundItem>);
    }
}
