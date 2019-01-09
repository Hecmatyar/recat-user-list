import {SimpleThunk} from "../../common/simpleThunk";
import {LoadState} from "../../common/loadState";
import {IAppState} from "../../core/store/appState";
import {calculatePage, DEFAULT_PAGE_SIZE} from "../../common/helpers/calculatePage";
import {showToastString} from "../../common/showToast";
import {requestRepository} from "../../core/api/requestRepository";
import {Page2Actions} from "./page2Actions";
import {Dispatch} from "react-redux";

export class Page2ActionsAsync {
    static get(params: LoadState): SimpleThunk {
        return async (dispatch: Dispatch<any>, getState: () => IAppState): Promise<void> => {
            dispatch(Page2Actions.getUsers.started(params));
            try {

                const count = getState().page2.users.length;

                const page = params == LoadState.refresing || params == LoadState.firstLoad || params == LoadState.pullToRefresh ? 1 :
                    calculatePage(count, DEFAULT_PAGE_SIZE);
                const response = await requestRepository.userApiRequest.get(page, DEFAULT_PAGE_SIZE);

                dispatch(Page2Actions.getUsers.done({params, result: response.results}));
            } catch (error) {
                showToastString("Something goes ne tak");
                dispatch(Page2Actions.getUsers.failed({params, error}));
            }
        };
    }
}