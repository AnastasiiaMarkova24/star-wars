import { Moment } from "moment";

export interface IFilmsState {
    isLoading: boolean;
    films: IFilm[];
    favouriteFilmIds: number[];
}

export interface IFilm {
    title: string;
    episode_id: number;
    opening_crawl?: string;
    director?: string;
    producer?: string;
    release_date?: Moment;
    characters?: string[];
    planets?: string[];
    starships?: string[];
    vehicles?: string[];
    species?: string[];
    created?: Moment;
    edited?: Moment;
}

export interface IFilmsActionTypes {
    setIsLoading: string;
    setFilms: string;
    markAsFavourite: string;
}

export interface IFilmsActions {
    setIsLoading: (isLoading: boolean) => void;
    setFilms: (films: IFilm[]) => void;
    markAsFavourite: (episodeId?: number) => void;

    getFilms: () => void;
}