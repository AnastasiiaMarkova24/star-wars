import { IFilmsState } from "./films";

export interface ApplicationState {
    films: IFilmsState;
};

export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
};

export interface IRestResponse<T> {
    isError: boolean;
    errorContent: string;
    content: T;
};