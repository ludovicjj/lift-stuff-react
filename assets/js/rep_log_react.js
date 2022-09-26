import React from "react";
import { createRoot } from 'react-dom/client';
import RepLogApp from "./RepLog/RepLogApp";

const shouldShowHeart = true;
const itemOptions = [
    {id: 'cat', text: 'Cat'},
    {id: 'fat_cat', text: 'Big Fat Cat'},
    {id: 'laptop', text: 'My Laptop'},
    {id: 'coffee_cup', text: 'Coffee Cup'},
    {id: 'invalid_item', text: 'Bad item'}
]
const root = createRoot(document.getElementById('lift-stuff-app'))
root.render(<RepLogApp withHeart={shouldShowHeart} itemOptions={itemOptions}/>)