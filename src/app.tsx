import { BrowserRouter, Route } from 'react-router-dom';
import FilmsPage from './components/films';

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path={'/'} exact component={FilmsPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
