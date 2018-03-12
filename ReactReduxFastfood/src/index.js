import React from 'react';
import ReactDOM from 'react-dom';
import ListPlaces from './Containers/ListPlaces';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Containers/Login';
import CreateAccount from './Containers/CreateAccount';
import LoadingComponent from './Containers/LoadingComponent';
import AuthenticatedComponent from './Containers/AuthenticatedComponent';
import PlaceDetail from './Containers/PlaceDetail';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoadingComponent>
        <Switch>
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/Login" component={Login} />
          <AuthenticatedComponent>
            <Route path="/:id" component={PlaceDetail} />
            <Route exact path="/" component={ListPlaces} />
          </AuthenticatedComponent>
        </Switch>
      </LoadingComponent>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
