import {BaseRequest} from "./BaseRequest";
import {RootObject} from "../../types/customAPI";

export class UserApiRequest extends BaseRequest {
    constructor(protected baseurl: string) {
        super(baseurl);
    }

    get(page: number, pageSize: number, config?: Object): Promise<RootObject> {
        return this.fetch(
            `/api/?&results=${pageSize}`,
            Object.assign({
                method: "GET"
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}