import React from "react";
import { createRoot } from 'react-dom/client';
import RepLogApp from "./RepLog/RepLogApp";

const shouldShowHeart = true;
const root = createRoot(document.getElementById('lift-stuff-app'))
root.render(<RepLogApp withHeart={shouldShowHeart}/>)