export interface ISystemState {
    buildNumber: number;
    authToken: string | null;
}

export const SystemInitialState: ISystemState = {
    buildNumber: 1,
    authToken: null
};