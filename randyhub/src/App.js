import React from 'react';
import {
  BrowserRouter, Route, Switch,

  Link,
} from 'react-router-dom';
import CookingWithRandy from './routes/CookingWithRandy';
import CovidCounter from './routes/CovidCounter';
import GitRepo from './routes/GitRepo';
import Main from './routes/Main';
import SnackOfChampions from './routes/SnackOfChampions';
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
      <Switch>
        <Route component={Main} exact path="/" />
        <Route component={SnackOfChampions} path="/snack-of-champions" />
        <Route component={CookingWithRandy} path="/cooking-with-randy" />
        <Route component={GitRepo} path="/git-repo" />
        <Route component={CovidCounter} path="/covid-counter" />
      </Switch>
    </BrowserRouter>
  </div>
);
export default App;
