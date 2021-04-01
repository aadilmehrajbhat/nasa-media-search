import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <p>Main page</p>
      <Link to="/search">Search</Link>
    </>
  );
}

function Search() {
  return <p>Search page</p>;
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
