import '../styles/rep_log.scss'

import RepLogApp from "./Components/RepLogApp";
import Accordion from "./Components/Accordion";

const wrapper = document.querySelector('.js-rep-log-table');
new RepLogApp(wrapper, wrapper.getAttribute('data-rep-logs'));

const acc = document.querySelector(".accordion-container");
new Accordion(acc);