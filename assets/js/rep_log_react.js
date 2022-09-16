import React from "react";
import { createRoot } from 'react-dom/client';
const el = <h2>Lift Stuff! <span>❤️</span></h2>;
const root = createRoot(document.getElementById('lift-stuff-app'))

root.render(el);