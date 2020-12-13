import ReactDOM from 'react-dom';
import createApp from './createApp.jsx';
import '../styles/application.scss';

ReactDOM.render(
  createApp(),
  document.getElementById('react-root'),
);
