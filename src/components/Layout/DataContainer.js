import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { withRouter } from "react-router";
import PrivateRoute from "../../utils/PrivateRoute";
import Login from "../content/Auth/Login";
import items from "./Routes";
const DataContainer = (props) => {
  const genPaths = (item) => {
    const Component = withRouter(item.component);
    const routes = [];

    routes.push(
      <PrivateRoute exact={item.exact} path={item.path}>
        <Component />
      </PrivateRoute>
    );

    if (item.subRoutes) {
      for (const route of item.subRoutes) {
        routes.push(
          <PrivateRoute path={item.path + route.path}>
            <route.component />
          </PrivateRoute>
        );
      }
    }

    return routes;
  };

  const routes = items.reduce(
    (routes, currRoutes) => [...routes, ...genPaths(currRoutes)],
    []
  );

  return (
    <Switch>
      {routes}
      <Route exact path="/" component={() => <Redirect to="/home" />} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

export default React.memo(DataContainer);
