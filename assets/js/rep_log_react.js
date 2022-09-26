import React from "react";
import { createRoot } from 'react-dom/client';
import RepLogApp from "./RepLog/RepLogApp";
import '../styles/rep_log.scss';
import Accordion from "./Components/Accordion";

const acc = document.querySelector(".accordion-container");
new Accordion(acc);

const shouldShowHeart = false;
const root = createRoot(document.getElementById('lift-stuff-app'))
// window.REP_LOG_APP_PROPS.withHeart override shouldShowHeart
// Last props override first props
root.render(<RepLogApp withHeart={shouldShowHeart} {...window.REP_LOG_APP_PROPS}/>)