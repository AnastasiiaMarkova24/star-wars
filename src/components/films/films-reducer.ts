import { Reducer } from "redux";
import { FilmsActionTypes } from "../../asserts/constants/films";
import FilmService from "./films-service";
import { IFilm, IFilmsActions, IFilmsState } from "../../asserts/types/films";
import { AppThunkAction } from "../../asserts/types/app";
import { notification } from "antd";

let filmService = new FilmService();
const initialState: IFilmsState = {
    isLoading: false,
    films: [],
    favouriteFilmIds: filmService.getFavouriteFilms()
}

const setIsLoading = (isLoading: boolean) => ({ type: FilmsActionTypes.setIsLoading, payload: isLoading });
const setFilms = (films: IFilm[]) => ({ type: FilmsActionTypes.setFilms, payload: films });
const markAsFavourite = (episodeId?: number) => ({ type: FilmsActionTypes.markAsFavourite, payload: episodeId });

type FilmsAction = ReturnType<typeof setIsLoading | typeof setFilms | typeof markAsFavourite>

const getFilms = (): AppThunkAction<FilmsAction> => (dispatch, _getState) => {
    dispatch(setIsLoading(true));

    filmService.loadPlanets()
        .then((response) => {
            if (response.isError) {
                notification.error({ message: response.errorContent });
            } else {
                dispatch(setFilms(response.content));
                notification.success({ message: 'Films have been loaded successfully!' });
            }
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const actions: IFilmsActions = {
    setIsLoading,
    setFilms,
    getFilms,
    markAsFavourite
}

export const reducer: Reducer<IFilmsState, FilmsAction> = (state = initialState, action: FilmsAction): IFilmsState => {
    switch (action.type) {
        case FilmsActionTypes.setIsLoading: {
            return {
                ...state,
                isLoading: action.payload as boolean
            }
        }
        case FilmsActionTypes.setFilms: {
            return {
                ...state,
                films: action.payload as IFilm[]
            }
        }
        case FilmsActionTypes.markAsFavourite: {
            const episodeId = action.payload as number;
            let favouriteFilmsCopy = [ ...state.favouriteFilmIds ];

            if (favouriteFilmsCopy.find(f => f === episodeId)) {
                favouriteFilmsCopy = favouriteFilmsCopy.filter(f => f !== episodeId);
            } else {
                favouriteFilmsCopy.push(episodeId);
            }

            filmService.saveFilmsAsFavourite(favouriteFilmsCopy);

            return {
                ...state,
                favouriteFilmIds: favouriteFilmsCopy
            }
        }
        default:
            return state;
    }
}