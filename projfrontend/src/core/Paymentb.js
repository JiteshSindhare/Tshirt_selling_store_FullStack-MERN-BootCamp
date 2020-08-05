import React, {useState, useEffect} from 'react'
import { loadCart, cartEmpty } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from './helper/paymentbhelper';
import {createOrder} from "./helper/orderHelper";
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({products, setReload = f => f, reload= undefined}) => {
    const [info, setInfo] = useState({
        loading: false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
        // instance just get automatically filled up with the request.
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const getToken = (userId,token) =>{
        // https://www.npmjs.com/package/braintree-web-drop-in-react

        getmeToken(userId,token).then(res => {
            console.log("INFORMATION",res);
            if(res.error){
                setInfo({...res,error:res.error});
            }else{
                const clientToken = res.clientToken;
                setInfo({clientToken});
                // can also be written as, setInfo({clientToken: clientToken})
            }
        });
    };

    const showbtdropIn =() => {
        return(
            <div> 
                { info.clientToken !== null && products.length > 0 ? 
                (<div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className="btn btn-success  btn-block"onClick={onPurchase}>Buy</button>
                  </div>) : 
                    (<h3>Please login or add something to cart.</h3>) }
            </div>
        );
    }

    useEffect(() => {
        // since we need token at first so if we use token here, then it will keep
        // calling our token method here.
        getToken(userId,token);
    }, []);

    const onPurchase =() => {
        setInfo({loading:true})
        // docs also call nonce, as something like crypto temp key.
        let nonce;
        // instance in our state, we talk to our brain tree, and our API gets back
        // to us with nonce. which is in instance.
        // this below line is read and taken form braintree docs.
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData ={
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response=>{
                setInfo({...info,success:response.success,loading:false})
                console.log("payment success");
                const orderData={
                    // check order schema for this, what columns we have in it.
                    products: products,
                    // read the payment gateway docs to know how to get 
                    // transaction id.
                    transaction_id: response.transaction.id,
                    amount : response.transaction.amount
                }
                createOrder(userId,token,orderData);
                cartEmpty(()=>{
                    console.log("did we got a crash");
                });
                // TODO: force Reload.
                setReload(!reload);
            })
            .catch(error=>{
                setInfo({loading:false,success:false});
                console.log("payment FAILED");
            })
        })
    }

    const getAmount=() =>{
        let amount=0;
        products.map((products)=>{
            amount = products.price + amount;
        })
        return amount;
    }

    return (
        <div>
            <h3>Bill is{getAmount()} $</h3>
            {showbtdropIn()}
        </div>
    )
};

export default Paymentb;