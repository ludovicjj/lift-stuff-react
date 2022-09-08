import '../styles/rep_log.scss'

import RepLogApp from "./Components/RepLogApp";

const wrapper = document.querySelector('.js-rep-log-table');
new RepLogApp(wrapper, wrapper.getAttribute('data-rep-logs'));