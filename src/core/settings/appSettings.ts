import {ReduxLoggerOptions} from "redux-logger";

export interface IAppSettings {
    appName: string;
    environment: "Development" | "Test" | "Staging" | "Production";
    notifications: INotificationSettings;
    serverUrl: string;
    identityUrl: string;
    loggerUrl: string;
    bugReportApiKey: string;
    useBugReporter: boolean;
    version: string;
    build: number;
    fetchTimeout: number;
    uploadTimeout: number;
    showVersion: boolean;
    stripeKey: string;
    devOptions: IDevOptions;
}

interface IDevOptions {
    reduxLogger?: ReduxLoggerOptions;
    reduxLoggerWhiteList?: string[];
    purgeStateOnStart: boolean;
    showAllComponentsOnStart: boolean;
    disableReduxLogger: boolean;
    androidHockeyOptions: IHockeyPublisherOptions;
    iOSHockeyOptions: IHockeyPublisherOptions;
}

interface IHockeyPublisherOptions {
    appId: string;
    apiToken: string;
}

interface INotificationSettings {
    senderId: string;
}
