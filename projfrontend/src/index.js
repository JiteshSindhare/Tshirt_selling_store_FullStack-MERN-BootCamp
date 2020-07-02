import React from 'react';
import Routes from './Routes';
import ReactDOM from 'react-dom';

// ReactDOM.render() takes two argument.
// 1st is what do we want to render.
// 2nd is where do we want to render.
//root pass in getElementById below is inside public>index.html
ReactDOM.render(<Routes/>,document.getElementById("root"));