import {Dispatch} from "redux";
import {IAppState} from "../../core/store/appState";
import {IPage2DispatchProps, IPage2StateProps} from "./Page2";
import {Page2ActionsAsync} from "./page2AsyncActions";

class Page2Selectors {
    mapState({page2}: IAppState): IPage2StateProps {
        return {
            users: page2.users,
            loadState: page2.loadingState
        };
    }

    mapDispatch(dispatch: Dispatch<IAppState>): IPage2DispatchProps {
        return {
            getUsers: (loadState): void => {
                dispatch(Page2ActionsAsync.get(loadState));
            }
        };
    }
}

export const page2Selectors = new Page2Selectors();