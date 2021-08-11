import { Tooltip } from 'antd';
import React from 'react';
import { IFilm } from '../../asserts/types/films';
import { FilmTitle } from '../../asserts/styles/general';

export const FilmTitleStyled = (props: { film: IFilm }) => {
    const { film: { opening_crawl, title, director } } = props;

    return (
        <div>
            <Tooltip title={opening_crawl}>
                <FilmTitle>{title}</FilmTitle>
            </Tooltip>
            <span>directed by {director}</span>
        </div>
    )
}