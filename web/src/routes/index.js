import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_PATH } from '../utils/route-util';

const Home = lazy(() => import('../pages/Home'));
const Loading = lazy(() => import('../components/Loading'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ROUTE_PATH.trip}>
          <Home />
        </Route>
        <Route path={ROUTE_PATH.root}>
          <Redirect to={ROUTE_PATH.trip} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
