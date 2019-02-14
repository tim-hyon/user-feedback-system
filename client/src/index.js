import '@babel/polyfill';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { RouterProvider } from 'react-router5';
import { router5Middleware } from 'redux-router5';
import { App } from 'containers';
import { createGlobalStyle } from 'styled-components';
import getColor from 'styles/colors';
import rootReducer from './reducer';
import rootSaga from './sagas';
import routes from './routes';

const GlobalStyle = createGlobalStyle` body {
    background: ${getColor('gray', 97)};
    margin: 0;
    color: ${getColor('gray', 20)};
    font-family: Arial;
  }
`;

const router = createRouter(routes, { defaultRoute: 'login' });

router.usePlugin(
  browserPlugin({
    useHash: true,
  }),
);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      router5Middleware(router),
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

router.start((err, state) => {
  render(
    <Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </Fragment>,
    document.getElementById('root'),
  );
});
