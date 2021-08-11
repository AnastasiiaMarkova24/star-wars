import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

export const MainLayout = styled(Layout)`
  height: 100vh;
`;

export const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  font-family: cursive;
  background: #1f2121;
  padding: 0 24px;
`;

export const Title = styled.h1`
  color: #00ffff;
  font-weight: bold;
  margin: 24px auto;
  text-align: center;
`;

export const Galaxy = styled.img`
  width: 30px;
`;

export const Film = styled.div`
  display: flex;
  font-weight: bold;
  margin: 0 24px;
  justify-content: space-between;
`;

export const Chapter = styled.h4`
  color: #c5316ed9 !important;
  font-size: 24px !important;
`;

export const FilmTitle = styled.h3`
  color: #71c5ca;
`;

export const OtherFilmInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Info = styled.h5`
  color: #bbe6e6;
`;