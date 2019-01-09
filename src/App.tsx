/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import _ from "lodash";
import React, {ErrorInfo, PureComponent} from "react";
import {AppStateStatus, UIManager} from "react-native";
import {Provider} from "react-redux";
import {Store} from "redux";
import {UnhandledError} from "./common/components/UnhandledError";
import {showToastString} from "./common/showToast";
import {BaseRequest} from "./core/api/BaseRequest";
import {appSettingsProvider} from "./core/settings";
import {IAppState} from "./core/store/appState";
import {configureStore, MigrateStoreMode} from "./core/store/configureStore";
import {SystemActions} from "./core/store/systemActions";
import {Page2} from "./modules/page2";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// /* tslint:disable:no-var-requires */
// require("moment/locale/en-ie");
// moment.updateLocale("en-ie", {
//     week: {
//         dow: 0, // Sunday is the first day of the week.
//         doy: 4  // The week that contains Jan 4th is the first week of the year.
//     }
// });
// moment.locale("en-ie");

interface IState {
    isError: boolean;
    appState: AppStateStatus;
}

export class App extends PureComponent<IEmpty, IState> {
    constructor(props: IEmpty) {
        super(props);
        this.onStoreConfigured = this.onStoreConfigured.bind(this);
        this.resetState = this.resetState.bind(this);
        this.forceResetApp = this.forceResetApp.bind(this);

        this.createStore(appSettingsProvider.settings.devOptions.purgeStateOnStart ? MigrateStoreMode.purge : MigrateStoreMode.none);
        this.state = {isError: false, appState: "active"};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({isError: true});
    }

    componentDidMount(): void {
        // if (Device.isPhone) {
        //     Orientation.lockToPortrait();
        // } else {
        //     Orientation.unlockAllOrientations();
        // }
    }

    render(): JSX.Element {
        if (this.state.isError) {
            return <UnhandledError onReset={this.forceResetApp}/>;
        } else {

            return (
                <Provider store={this.store}>
                    <Page2/>
                </Provider>
            );
        }
    }

    private onStoreConfigured(): void {
        // const authToken = this.store.getState().system.authToken;
        // if (__DEV__) {
        //     DevMenu.addItem("Navigate to Playground", () => this.store.dispatch(NavigationActions.navigateToPlayground()));
        // }

        const globalOptions = {
            setToken: (t: string): any => this.store.dispatch(SystemActions.setToken(t)),
            getToken: (): string | null => this.store.getState().system.authToken,
            onAuthError: _.debounce(() => {
                showToastString("Authentication error.");
                this.resetState(MigrateStoreMode.resetStateWithToken);
            }, 600),
        };

        BaseRequest.globalOptions = globalOptions;

        // NotificationHub.instance.configure();

        // if (appSettingsProvider.settings.useBugReporter) {
        //     BugsnapConfiguration.configure(this.store);
        // }

        // if (authToken != null) {
        //     ignorePromise(requestsRepository.mobileUtilsApiRequest.checkUserAuth());
        // }
    }

    private createStore(mode: MigrateStoreMode): void {
        const {store} = configureStore(this.onStoreConfigured, {migrateMode: mode});
        this.store = store;
        // NotificationHub.instance = new NotificationHub(this.store.dispatch, this.store.getState);
    }

    private resetState(mode: MigrateStoreMode): void {
        this.setState({isError: true}, () => {
            this.createStore(mode);
            this.setState({isError: false});
        });
    }

    private forceResetApp(): void {
        this.setState({isError: true}, () => {
            this.resetState(MigrateStoreMode.resetStatePreserveToken);
        });
    }

    private store: Store<IAppState>;
}
