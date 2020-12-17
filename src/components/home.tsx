import React, { Component } from 'react';
import { connect } from 'react-redux';
import galaxy from '../images/galaxy.svg';
import { ApplicationState } from '../types/app';
import { MainLayout, Container, Galaxy, Title, Film, Chapter, FilmTitle, OtherFilmInfo, Info } from './styled';
import * as Films from '../store/films-reducer';
import { IFilm, IFilmsActions, IFilmsState } from '../types/films';
import LoadingOverlay from 'react-loading-overlay';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Button, Tooltip, Tabs } from 'antd';
import { TabTitles } from '../constants/films';
import moment from 'moment';

const { TabPane } = Tabs;

class Home extends Component<IFilmsState & IFilmsActions> {
  componentDidMount() {
    const { getFilms } = this.props;
    getFilms();
  }

  renderFilmTitle = (film: IFilm) => {
    return (
      <div>
        <Tooltip title={film.opening_crawl}><FilmTitle>{film.title}</FilmTitle></Tooltip>
        <span>directed by {film.director}</span>
      </div>
    )
  }

  render() {
    const { isLoading, films, markAsFavourite, favouriteFilms } = this.props;
    const favourite = films.filter(f => favouriteFilms.includes(f.episode_id));

    return (
      <LoadingOverlay active={isLoading} spinner>
        <MainLayout>
          <Container>
            <Title>Welc<Galaxy src={galaxy} />me to Star Wars Films</Title>
            <Tabs defaultActiveKey={TabTitles.Films}>
              <TabPane key={TabTitles.Films} tab={<Chapter>{TabTitles.Films}</Chapter>}>
                {
                  films.map((film, index) => (
                    <Film key={`film_${index}`}>
                      {this.renderFilmTitle(film)}
                      <div>
                        <Button icon={favouriteFilms.find(f => f === film.episode_id) ? <StarFilled /> : <StarOutlined />} type='link' onClick={() => markAsFavourite(film.episode_id)} />
                      </div>
                    </Film>
                  ))
                }
              </TabPane>
              <TabPane disabled={favouriteFilms.length === 0} key={TabTitles.FavouriteFilms} tab={<Chapter>{TabTitles.FavouriteFilms}</Chapter>}>
                {
                  favourite.map((film, index) => (
                    <Film key={`fav_film_${index}`}>
                      {this.renderFilmTitle(film)}
                      <OtherFilmInfo>
                        <Info>created at {moment(film.created).format('LL')}</Info>
                      </OtherFilmInfo>
                    </Film>
                  ))
                }
              </TabPane>
            </Tabs>
          </Container>
        </MainLayout>
      </LoadingOverlay>
    )
  }
}

export default connect((state: ApplicationState) => state.films, Films.actions)(Home);