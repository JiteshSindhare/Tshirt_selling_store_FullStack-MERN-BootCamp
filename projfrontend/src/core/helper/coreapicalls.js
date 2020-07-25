const { API } = require("../../backend");

export const getProducts = () => {
    // it is API to get ALL product, check product.js in route of backend.
    return fetch(`${API}/products`,{method:"GET"})
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error) )
}