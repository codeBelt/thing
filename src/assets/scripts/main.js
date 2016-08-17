import App from './App';
import HandlebarsHelpers from './utils/HandlebarHelpers';

HandlebarsHelpers.init();

const app = new App();
app.appendTo('body');
