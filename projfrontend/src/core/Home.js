import React, {useEffect , useState} from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';



export default function Home(){
    // console.log("API IS",API);
    
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        });
    };

    // this is to launch a method we need to load as soon as the page loads.
    useEffect( () => {
        loadAllProduct()
    },[]);

    return(
        // if we pass value like
        // <Base title="Home page" so the value of title written in argument of Base
        // base function in file Base.js it will be overriten.
        <Base title="Home Page" description="Welcome to home page">
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>
                <div className="row">
                    {products.map( (product,index) => {
                        return(
                            // since this div is going to be repeated again and again
                            // so we are using key to uniquely identify them.
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}