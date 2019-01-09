import {UserApiRequest} from "./userApiRequest";
import {appSettingsProvider} from "../settings";

class RequestsRepository {
    userApiRequest = new UserApiRequest(this.baseurl);

    constructor(private baseurl: string) {
    }
}

export const requestRepository = new RequestsRepository(appSettingsProvider.settings.serverUrl);