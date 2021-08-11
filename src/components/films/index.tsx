import { ApplicationState } from '../../asserts/types/app';
import { Button, Tabs } from 'antd';
import { connect } from 'react-redux';
import { FilmTitleStyled } from '../general/titles';
import { IFilm, IFilmsActions, IFilmsState } from '../../asserts/types/films';
import { MainLayout, Container, Galaxy, Title, Film, Chapter, OtherFilmInfo, Info } from '../../asserts/styles/general';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { TabTitles } from '../../asserts/constants/films';
import { useEffect, useState } from 'react';
import * as Films from './films-reducer';
import galaxy from '../../asserts/images/galaxy.svg';
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment';

const { TabPane } = Tabs;

const FilmsPage = (props: IFilmsState & IFilmsActions) => {
  const { isLoading, films, markAsFavourite, favouriteFilmIds, getFilms } = props;
  const [favouriteFilms, setFavouriteFilms] = useState<IFilm[]>([]);

  useEffect(() => getFilms(), []);
  useEffect(() => {
    setFavouriteFilms(films.filter(f => favouriteFilmIds.includes(f.episode_id)));
  }, [films]);

  return (
    <LoadingOverlay active={isLoading} spinner>
      <MainLayout>
        <Container>
          <Title>Welc<Galaxy src={galaxy} />me to Star Wars Films</Title>
          <Tabs defaultActiveKey={TabTitles.Films}>
            <TabPane key={TabTitles.Films}
              tab={<Chapter>{TabTitles.Films}</Chapter>}>
              {
                films.map((film, index) => (
                  <Film key={`film_${index}`}>
                    <FilmTitleStyled film={film} />
                    <div>
                      <Button icon={favouriteFilmIds.find(f => f === film.episode_id) ? <StarFilled /> : <StarOutlined />}
                        type='link'
                        onClick={() => markAsFavourite(film.episode_id)} />
                    </div>
                  </Film>
                ))
              }
            </TabPane>
            <TabPane disabled={favouriteFilmIds.length === 0}
              key={TabTitles.FavouriteFilms}
              tab={<Chapter>{TabTitles.FavouriteFilms}</Chapter>}>
              {
                favouriteFilms.map((film, index) => (
                  <Film key={`fav_film_${index}`}>
                    <FilmTitleStyled film={film} />
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

const mapStateToProps = (state: ApplicationState) => ({
  ...state.films
});
const mapDispatchToProps = Films.actions;
export default connect(mapStateToProps, mapDispatchToProps)(FilmsPage);