import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Main from 'views/Main';
import Favourite from 'views/Favourite';
import Settings from 'views/Settings';
import AddPage from 'views/AddPage';

const Root = () => {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <MainTemplate>
            <Switch>
              <Route exact path={routes.home} render={() => <Redirect to={routes.home} />} />
              <Route exact path={routes.main} component={Main} />
              <Route exact path={routes.favourite} component={Favourite} />
              <Route exact path={routes.settings} component={Settings} />
              <Route exact path={routes.add} component={AddPage} />
            </Switch>
          </MainTemplate>
        </HashRouter>
      </Provider>
    </>
  );
};

export default Root;
