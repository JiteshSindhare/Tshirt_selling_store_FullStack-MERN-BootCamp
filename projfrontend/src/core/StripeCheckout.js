import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/CartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'

//  StripeCheckout can be wrapped up anywhere. on any component


const StripeCheckout = ({products, setReload =f => f,reload=undefined}) => {
    // to know setReload=f=>f check comment in Card.js
    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () =>{
        let amount = 0;
        // map gives each index and product , since we only need product
        // so we are using only p in here.
        products.map(p =>{
            amount = amount + p.price;
        })
        return amount;
    };

    const makePayment =(token) => {
        // it takes token, and that token is automatically generated with the help
        // of key which we provide. based on that we can make request to backend
        // then deicde on backend if we have to process things or not.
        // usually this things like connecting with backend should be in helper files.
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response =>{
            console.log(response)
            // we can create orders here once we get a success in payment.
            // then also we can call clear cart here.
            const {status} = response;
            console.log("STATUS",status);
            cartEmpty();
        }).catch(error => console.log(error))
    };
    const pubkey=process.env.REACT_APP_SPKEY;
    const showStripeButton =() => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey={pubkey}
            token={makePayment}
            // this token runs a method.
            amount={getFinalAmount() * 100}
            // multiplying by 100 because it works in cents, and here we want to
            // charge user in $.
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign In</button>
            </Link>
        ) ;
    }
    
    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout