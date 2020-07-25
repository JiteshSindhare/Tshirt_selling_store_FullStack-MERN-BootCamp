import React, {useState, useEffect} from 'react'
import Imagehelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemfromCart } from './helper/CartHelper';

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    reload = undefined
    // in setReload, we are setting the we will pass a function and it will return 
    // the same thing pass in that function, i.e. (function(f){return f}) which can
    // also be written as, f => f.
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count); 
    // in above line we are introducing a new property in product which is count.
    // and we are incrementing the count through cartHelper.
    // notice we have "count" in productCartSchema in order.js in backend.
    // probably just taking that value and only that many times the product is
    // getting added in the cart(in CartHelper.js)

    const cartTitle = product ? product.name : "A photo from internet" ;
    const cartDescription = product ? product.description : "Default description" ;
    const cartPrice = product ? product.price : "default" ;


    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to= "/cart"/>
        }
    }
    const showAddtoCart = (addtoCart) => {
        // put AddtoCard button in this componenet so as to conditionally render
        // it only when it is not in cart.
        return(
            addtoCart && (<button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>)
        );
    };

    const showRemoveFromCart = (removeFromCart) => {
      // it remove fro mlocal storage, to show updated number of items in our cart.
      // so we need to make our component reload itself, so we will make a manual reload
      // so whenever we want to reload or remount the component  we have to use some kind
      // of state.(like when we call setRedirect then this allows us to react know and relaod)
      // so we make a that kind of method inside Cart.js
        return(
            removeFromCart && ( <button
                onClick={() => {
                  removeItemfromCart(product._id);
                  setReload(!reload)
                  // it does not depend on true or false of reload. we are just updating
                  // information in state so that it reloads. can even do 1/2 or anything
                  // just update/change the value.
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button> )
        );
    };
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
            <Imagehelper product={product} />
              {/* 
              <div className="rounded border border-success p-2">

                 this part is to load statically. since we have to load images
                from database and show here dynamically. so made a new componenet
                and load it here.
                <img
                  src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                /> 
              </div>
              */}
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddtoCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };

export default Card;