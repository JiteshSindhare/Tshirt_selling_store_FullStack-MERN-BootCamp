const { API } = require("../../backend");

export const getmeToken =  (userId, token) => {
    // see route of getToken of this payment gateway in backend
    return fetch(`${API}/payment/gettoken/${userId}`,{
        method:"GET",
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response =>{
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const processPayment = (userId, token, paymentInfo) => {
    // userId coz we are checking authentication in the backend
    // token coz this braintree actually checks this token.
    return fetch(`${API}/payment/braintree/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(response =>{
        return response.json();
    })
    .catch(err=>console.log(err))
}