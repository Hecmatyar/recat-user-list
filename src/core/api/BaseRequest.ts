import {assertNotNull} from "../../common/assertNotNull";
import {UrlHelper} from "../../common/helpers/urlHelper";
import {ExceptionType, NoAuthError} from "../exceptionTypes";
// import {dexLogger} from "../dexLogger";
import {appSettingsProvider} from "../settings";

export interface IRequestOptions {
    getToken: () => string | null;
    setToken: (token: string) => void;
    onAuthError: () => void;
}

export class BaseRequest {
    static handleError = (error: any): Promise<any> => {
        return Promise.reject(error);
    };
    static globalOptions: IRequestOptions;

    constructor(protected baseUrl: string) {
        this.emptyResponse = new EmptyResponse();
    }

    protected get options(): IRequestOptions {
        return BaseRequest.globalOptions || {
            getToken: (): string | null => null,
            onAuthError: (): void => console.log("onAuthError is not set") //dexLogger.warning("onAuthError is not set")
        };
    }

    protected addTokenToHeaders(headers: any): any {
        const userToken = this.options.getToken();
        if (userToken != null) {
            return {...headers, "Authorization": `Bearer ${userToken}`} as any;
        } else {
            return headers;
        }
    }

    protected async fetch(url: string, config: any, isFullUrl?: boolean): Promise<any> {
        let isRequestError = false;
        // let status: number | null = null;

        try {
            const headers = this.addTokenToHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json"
            });
            const fullUrl = "https://randomuser.me" + url;
            console.log(fullUrl);

            const response = await fetch(fullUrl, Object.assign({headers: headers}, config));

            // status = response.status;
            if (response.status == 401) {
                this.options.onAuthError();

                throw new NoAuthError("No auth for " + url);
            } else if (response.status == 204) {
                return this.emptyResponse;
            } else if (!response.status || response.status < 200 || response.status >= 300) {
                isRequestError = true;

                const error = await response.json();
                throw error;
            }

            return response;
        } catch (error) {
            if (isRequestError == false) {
                //dexLogger.log("Connection error", error);
                const connectionError: any = new Error(error.message);
                connectionError.name = ExceptionType.Connection;
                connectionError.innerError = error;
                connectionError.url = url;
                if (error.message == "Network request failed") {
                    connectionError.message = "Connection error";
                }
                throw connectionError;
            } else {
                error.isServerError = true;
                //dexLogger.exception(error, "Request error", {url, status});
                throw error;
            }
        }
    }

    protected createUrl(relativeUrl: string): string {
        return UrlHelper.create(relativeUrl, this.getUrl());
    }

    protected q(params: { [key: string]: string | number | boolean | string | Date | null }): string {
        const query = Object.keys(params)
            .filter(k => params[k] != null)
            .map(k => `${k}=${encodeURIComponent(assertNotNull(params[k]).toString())}`)
            .join("&");

        return query ? `?${query}` : "";
    }

    private getUrl(): string {
        return appSettingsProvider.settings.serverUrl;
    }

    private emptyResponse: EmptyResponse;
}

class EmptyResponse {
    public json(): any {
        return null;
    }
}