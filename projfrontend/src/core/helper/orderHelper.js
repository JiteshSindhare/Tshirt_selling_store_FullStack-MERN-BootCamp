const { API } = require("../../backend");


export const createOrder = (userId, token, orderData) => {
    // check order.js in routes of backend is from that.
    return fetch(`${API}/order/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization:`Bearer ${token}`
        },
        // in stringify we are passing order as JSON after checking backend controller
        // of this particular route and how order is getting created/saved.
        body: JSON.stringify({order:orderData})
    }).then(response => {
        return response.json();
    })
    .catch(error =>{
        console.log("Error is in creating order");
        console.log(error);
    });

};