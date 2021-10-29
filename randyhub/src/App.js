import React, { Suspense } from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Main from './routes/Main';
import './index.css';
import CustomCursor from './common/CustomCursor';

const App = () => (
  <div id="app">
    <CustomCursor />
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route component={Main} exact path="/" />
          <Route component={React.lazy(() => import('./routes/SnackOfChampions'))} path="/snack-of-champions" />
          <Route component={React.lazy(() => import('./routes/CookingWithRandy'))} path="/cooking-with-randy" />
          <Route component={React.lazy(() => import('./routes/GitRepo'))} path="/git-repo" />
          <Route component={React.lazy(() => import('./routes/CovidCounter'))} path="/covid-counter" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);

export default App;
