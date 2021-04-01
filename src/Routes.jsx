import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home, Search } from '@pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
