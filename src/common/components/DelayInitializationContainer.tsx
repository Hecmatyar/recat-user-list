import {PureComponent} from "react";

export class DelayInitializationContainer extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {isVisible: props.delay <= 0};
    }

    componentDidMount(): void {
        setTimeout(() => this.setState({isVisible: true}), this.props.delay);
    }

    render(): JSX.Element | null {
        if (this.state.isVisible) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

interface IProps {
    children: JSX.Element;
    delay: number;
}

interface IState {
    isVisible: boolean;
}