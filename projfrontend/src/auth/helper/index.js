import {API} from "../../backend"
// API means localhost and port of our backend which we have in .env file
// and have used it in our backend.js


// this user will come as json format from frontend.
export const signup= user => {
    // 2nd argument of fetch is the things we want to pass to our backend.
    // in this page /signup.
    // so basically 2nd argument is carrying baggage that we are taking while
    // making this request.
    return fetch(`${API}/signup`,{
        method: "POST",
        headers: {
            // remember we used to select this in postman while checking backend.
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    // .then() is for when eveyrthing goes successfully
    .then(response=>{
        // converting our response to json and giving to frontend.
        return response.json();
    })
    // .catch() is for when we have an error.
    .catch(err => console.log(err));
}



// this user will come as json format from frontend.
export const signin= user => {
    // 2nd argument of fetch is the things we want to pass to our backend.
    // in this page /signup.
    // so basically 2nd argument is carryign baggage that we are taking while
    // making this request.
    return fetch(`${API}/signin`,{
        method: "POST",
        headers: {
            // remember we used to select this in postman while checking backend.
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    // .then() is for when eveyrthing goes successfully
    .then(response=>{
        // converting our response to json and giving to frontend.
        return response.json();
    })
    .catch(err => console.log(err));
}

// we have taken and handled a JSON response , but browser does not remember
// this JSON response much. so we have to make sure that user continuously signedIn
// once he has hit the signin route successfully. So,

export const authenticate = (data,next) =>{
    // below if checks if windows object is accessible to us.
    if(typeof window !== "undefined"){
    // If we are able to access the windows object. then we access the
    // local storage of react and we setItem "jwt" with JSON.stringify(data)
    // that means we are setting a "jwt" token with data if a user is successfully
    // signedIn.
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}
// so in signOut we access above object and remove jwt token from it.
// notice since we have used next here, so it is a middleware.
// so we are using it as middleware coz it allows us to give a callback and then
// we can perform some extra functions after signing out.
//  in this case after logging-Out we want to redirect user to home or login Page.
export const signout= next => {
    if(typeof window !== "undefined"){
        // removing the jwt we set after signing In.
            localStorage.removeItem("jwt")

        // this next() is debatable as we can also place next() after .catch() instead
            next();

        // now we need to logout the user from the backend as well.
        return fetch(`${API/signout}`,{
            method: "GET"
        })
        // .then() is for if there is a success.
        .then(response => console.log("signout success"))
        // .catch() is when we get error and signout was not successful.
        .catch(err => console.log(err))
        }
};

// to validate that the user is signedIn or not.
export const isAuthenticated=()=>{
    if(typeof window == "undefined"){
            return false;
        }
    if(localStorage.getItem("jwt")){
        // here if "jwt" is present in localstorage, then we are sending that token
        // to forntend. Then we will again check in our frontend if token is exactly
        // same as the user we are looking up for. then only it will be true.
        // so it basically sends user and token to frontend(i.e. whereever
        // we will use this method).
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}