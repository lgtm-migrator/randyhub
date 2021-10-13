import React, { Suspense } from 'react';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import Main from './routes/Main';
import './index.css';

const App = () => (
  <div id="app">
    <BrowserRouter>
      <div className="links">
        <h2><Link to="/">Main Page</Link></h2>
        <h2><Link to="/snack-of-champions">The Snack of Champions</Link></h2>
        <h2><Link to="/covid-counter">Covid Counter</Link></h2>
        <h2><Link to="/cooking-with-randy">Cooking with Randy</Link></h2>
        <h2><Link to="/git-repo">Randy Hub repo info</Link></h2>
      </div>
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
