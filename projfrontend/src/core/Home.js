import React from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';


export default function Home(){
    console.log("API IS",API);
    return(
        // if we pass value like
        // <Base title="Home page" so the value of title written in argument of Base
        // base function in file Base.js it will be overriten.
        <Base title="Home Page">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    )
}