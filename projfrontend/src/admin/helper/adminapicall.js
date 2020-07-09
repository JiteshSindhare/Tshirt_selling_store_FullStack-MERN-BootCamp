import { API } from "../../backend";

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
}