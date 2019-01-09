import React from "react";
import {Image, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {IUser} from "../../types/customAPI";
import {LoadState} from "../../common/loadState";
import {styleSheetCreate} from "../../common/utils/styleSheetCreate";
import {TryAgain} from "../../common/components/TryAgain";
import {EmptySpaceList} from "../../common/components/EmptySpaceList";
import {EmptySearchResult} from "../../common/components/EmptySearchResult";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {page2Selectors} from "./page2Selectors";
import {connectAdv} from "../../core/store/connectAdv";

export interface IPage2StateProps {
    users: IUser[];
    loadState: LoadState;
}

export interface IPage2DispatchProps {
    getUsers: (loadState: LoadState) => void;
}

@connectAdv(page2Selectors.mapState, page2Selectors.mapDispatch)
export class Page2 extends BaseReduxComponent<IPage2StateProps, IPage2DispatchProps> {
    constructor(props: IEmpty) {
        super(props);
        this.state = {searchString: ""};
        this.renderItem = this.renderItem.bind(this);
        this.tryAgain = this.tryAgain.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.pullToRefresh = this.pullToRefresh.bind(this);
    }

    componentDidMount(): void {
        this.dispatchProps.getUsers(LoadState.firstLoad);
    }

    render(): JSX.Element {
        // return <View><Text>hi</Text></View>;

        const {loadState, users} = this.stateProps;

        if (loadState == LoadState.error) {
            return <TryAgain onPress={this.tryAgain}/>;
        }

        return (
            <View style={styles.container}>
                <FlatListWrapper
                    containerStyle={styles.listContainer}
                    style={styles.list}
                    data={users}
                    renderItem={this.renderItem}
                    loadState={loadState}
                    EmptyComponent={EmptySearchResult}
                    onRefresh={this.pullToRefresh}
                    tryAgain={this.tryAgain}
                    loadMore={this.loadMore}
                    ListFooterComponent={EmptySpaceList}
                    ListHeaderComponent={EmptySpaceList}
                    keyExtractor={this.defaultIdExtractor}
                />
            </View>
        );
    }

    private renderItem({item, index}: { item: IUser, index: number }): JSX.Element | null {
        const {name, picture, phone, email} = item;

        return (

            <View style={styles.containerItem}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: picture.medium}}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.bigText}>{name.first.toUpperCase() + " " + name.last.toUpperCase()}</Text>
                    <Text style={styles.smallText}>{email}</Text>
                    <Text style={styles.smallText}>{phone}</Text>
                </View>
            </View>

        );
    }

    private tryAgain(): void {
        this.dispatchProps.getUsers(LoadState.firstLoad);
    }

    private pullToRefresh(): void {
        this.dispatchProps.getUsers(LoadState.pullToRefresh);
    }

    private loadMore(): void {
        this.dispatchProps.getUsers(LoadState.loadingMore);
    }

    private defaultIdExtractor = (item: IUser, index: number): string => {
        return index.toString();
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee",
    } as ViewStyle,
    searchView: {
        paddingHorizontal: 16,
        paddingBottom: 14,
        backgroundColor: "#eeeeee"
    } as ViewStyle,
    listContainer: {
        flex: 1,
        backgroundColor: "#eeeeee",
        overflow: "hidden",
    } as ViewStyle,
    list: {
        backgroundColor: "#eeeeee",
        paddingTop: 8,
        overflow: "hidden"
    } as ViewStyle,
    item: {
        marginVertical: 4,
        marginHorizontal: 8,
    } as ViewStyle,
    containerItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8
    } as ViewStyle,
    imageContainer: {
        borderRadius: 30,
        width: 60,
        height: 60,
        overflow: "hidden"
    } as ViewStyle,
    textContainer: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 8
    } as ViewStyle,
    image: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    } as ImageStyle,
    bigText: {
        fontSize: 18,
        color: "#444444",
    } as TextStyle,
    smallText: {
        fontSize: 12,
        color: "#666",
    } as TextStyle,
});