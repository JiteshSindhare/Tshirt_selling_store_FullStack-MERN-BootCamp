import React from 'react'
import Menu from './Menu';

// in a function or arrow function like below
// if there is this {} bracket then return keyword is necessary.
// other we can also use () and inside that we can return anything inside it.
const Base = ({
    title="My Title",
    description="My description",
    className="bg-dark text-white py-4",
    children
    // when we use this children, then our Base component will act as an enclosing
    // Parent. So whatever we will pass inside Base tag like we are doign in Home.js
    // so those content will act like children of Base, i.e. Base will encompass it.
    // coz we are using {children} between title and footer in this file.
}) => (
    <div>
        {/* injected our Menu(nav) bar here. coz we want NavBar in all apge. */}
        <Menu />
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center">
            <h2 className="display-4">{title}</h2>
                <p className="lead"> {description} </p>
            </div>
        <div className={className}> {children} </div>
        </div> 
        <footer className="footer bg-dark mt-auto py-3">
            {/* mt-auto is setting margin to auto */}
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>Hello there</h4>
                <button className="btn btn-warning btn-lg">Random button</button>
            </div>
            <div className="container">
                <span className="text-muted">
                    Working on amazing 
                    <span className="text-white">
                    MERN
                    </span>
                     bootcamp.
                </span>
            </div>
        </footer>
    </div>
)

export default Base;