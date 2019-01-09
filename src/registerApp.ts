import {AppRegistry} from "react-native";
import {App} from "./App";
import {Playground} from "./common/playground";
import {appSettingsProvider} from "./core/settings";

// noinspection JSUnusedGlobalSymbols | used from js code
export function registerApp(): void {
    const rootComponent = appSettingsProvider.settings.devOptions.showAllComponentsOnStart ? Playground : App;
    AppRegistry.registerComponent(appSettingsProvider.settings.appName, () => rootComponent);
}
