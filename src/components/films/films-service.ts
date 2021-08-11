import { FavouriteFilms } from "../../asserts/constants/films";
import { IRestResponse } from "../../asserts/types/app";
import { IFilm } from "../../asserts/types/films";

class FilmsService {
    loadPlanets = (): Promise<IRestResponse<IFilm[]>> => {
        const requestOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' }};
        let isError = false;

        return fetch('https://swapi.dev/api/films/', requestOptions)
            .then(response => {
                if (!response.ok) {
                    isError = true;
                } 

                return response.json();
            }).then((response) => {
                const res: IRestResponse<IFilm[]> = {
                    isError,
                    errorContent: isError ? response?.detail || 'Something went wrong!' : '',
                    content: response?.results || []
                };

                return res;
            });
    }

    saveFilmsAsFavourite = (favouriteFilmIds: number[]) => {
        localStorage.setItem(FavouriteFilms, JSON.stringify(favouriteFilmIds));
    }

    getFavouriteFilms = (): number[] => {
        return JSON.parse(localStorage.getItem(FavouriteFilms) || '[]');
    }
}

export default FilmsService;