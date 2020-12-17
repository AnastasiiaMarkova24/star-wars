import { IFilmsActionTypes } from "../types/films";

export const FilmsActionTypes: IFilmsActionTypes = {
    setIsLoading: 'SET_IS_LOADING',
    setFilms: 'SET_FILMS',
    markAsFavourite: 'MARK_AS_FAVOURITE'
};

export const FavouriteFilms = 'FAVOURITE_FILMS';

export const TabTitles = {
    Films: 'Films',
    FavouriteFilms: 'Favourite Films'
};