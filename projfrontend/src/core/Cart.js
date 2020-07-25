import React, {useEffect , useState} from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';



const Cart = () => {
    // console.log("API IS",API);
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return(
            <div>
                <h2 >Just loading all products</h2>
                {products.map( (product,index) =>(
                    // passing product coz, see Card.js, it requires product.
                    < Card
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                    // passing our fake method/state variable since we want this to
                    // reload when we remote a product from cart. then we also mention
                    // this in Card.js, showRemoveFromCart button. since we want to
                    // reload it when RemoveFromCard button is clicked.
                    />
                ))}
            </div>
        );
    }

    const loadCheckout = () => {
        return(
            <div>
                <h2 >For checkout.</h2>
            </div>
        );
    }

    return(
        // if we pass value like
        // <Base title="Home page" so the value of title written in argument of Base
        // base function in file Base.js it will be overriten.
        <Base title="Cart Page" description="Products in cart , Ready to checkout">
            <div className="row text-center">
    <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
};

export default Cart;