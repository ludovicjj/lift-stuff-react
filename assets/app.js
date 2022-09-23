/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// bootstrap JS
import 'bootstrap';

// fontawesome
import '@fortawesome/fontawesome-free/js/all.js';

// fetch polyfill
import 'whatwg-fetch';
// promise polyfill: add a global Promise object
import 'promise-polyfill/src/polyfill';

// start the Stimulus application
//import './bootstrap';
