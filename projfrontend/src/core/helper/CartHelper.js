export const addItemToCart = (item,next) => {
    // next is there to write our own callback.
    let cart= []

    // if we have an access to window object.
    if(typeof window !== undefined){
        if(localStorage.getItem("cart") ) {
            // if there is any existing cart then we are retrieving it.
            cart= JSON.parse(localStorage.getItem("cart"));
            // now we just took an existing cart and pushed that cart in our empty 
            // variable.
        }
        // it is just loading all and adding item in our cart variable.
        // count is introduced coz without it multiple instance of a product was
        //  getting added.
        cart.push({
            ...item,
            count:1
            // this count is added after adding count as state in Card.js
        })
        
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
};

export const loadCart = () =>{
    if(typeof window !== undefined){
        if(localStorage.getItem("cart") ) {
            // if there is any existing cart then we are retrieving it.
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
};

export const removeItemfromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart") ) {
            cart= JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,i)=>{
            if(product._id===productId){
                cart.splice(i,1);
            }
        });
        // storing updated cart in local storage.
        localStorage.setItem("cart",JSON.stringify(cart));   
    }
    return cart;
};

export const cartEmpty = next => {
    // to clear cart , this will be in handy after a payment is been made.
    // next is because we need a callback coz once the cart is empty we might
    // to redirect user somewhere or show a message or something.
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));   
        next();
    }
};