import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import configureStore from './store/index.jsx';
import { getSocket } from './socket.jsx';
// import filelist from 'filelist.jsx';

export default function(App) {

  const history = createHistory();
  const store = configureStore(history);

  const socket = getSocket();

  socket.on('connect', () => {
    store.dispatch({type: 'Socket.state_changed', group: 'Socket', name: 'state_changed', payload: {connected:true}});
  });

  socket.on('disconnect', () => {
    store.dispatch({type: 'Socket.state_changed', group: 'Socket', name: 'state_changed', payload: {connected:false}});
  });

  socket.on('action', (group, name, payload) => {
    var operator = "=";
    if (name.endsWith("+") || name.endsWith("-")) {
      operator = name.slice(-1);
      name = name.slice(0, -1);
    }
    store.dispatch({type: `${group}.${name}`, group, name, operator, payload});
  });

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('main')
  );

}