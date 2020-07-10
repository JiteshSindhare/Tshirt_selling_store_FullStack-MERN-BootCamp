import { API } from "../../backend";

// CHeck in backend routes how this routes are actually working
// so that you don't make any mistakes while writting address in fetch()
// Category calls.
export const createCategory=(userId, token, category)=>{
    // using backticks i.e. ` (symbol before 1) coz we have to use 
    //  variables in between string, 
    // 2nd argument of fetch some more information that will go 
    // as an object. i.e. things like we used to set in postman while
    // testing this method/route in backend.
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization : ` Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(error=>console.log(error))
};
// get all category.
export const getCategories=()=>{
    // no need of any userId,token or product coz this route is open for public.
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};
// Product calls

    // create product
export const createProduct= (userId,token,product) => {
    // in this case product is not coming in json format so we can directly pass ot.
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        header:{
            Accept:"application/json",
            Authorization : ` Bearer ${token}`
        },
        body:product
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};

    // get All product.
export const getProducts=()=>{
    // no need of any userId,token or product coz this route is open for public.
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};

// delete a product.
export const deleteProduct= (userId,token,productId) => {
    // in this case product is not coming in json format so we can directly pass ot.
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        header:{
            Accept:"application/json",
            Authorization : ` Bearer ${token}`
        }
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};

// get a product.
export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
        // even if we don't provide anything than it usually is GET method.
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};

    // update a product
export const updateProduct= (productId,userId,token,product) => {
    // productId is the product we want to update.
    // Product is the new information of the product.
    // in this case product is not coming in json format so we can directly pass ot.

    // check route of this update product in backend.
    return fetch(`${API}/product/create/${productId}/${userId}`,{
        method:"PUT",
        header:{
            Accept:"application/json",
            Authorization : ` Bearer ${token}`
        },
        body:product
    }).then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
};