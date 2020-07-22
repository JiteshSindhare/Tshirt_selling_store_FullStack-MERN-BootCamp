import React,{useState} from "react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"

import {signin, authenticate, isAuthenticated} from "../auth/helper"

// in that folder we are importing form index.js, therefore we don't have
// to specify index.js
const Signin=()=>{

    // loading is for showing loading messages to user
    // like, things are going on please have patience.
    // didRedirect is for when user is successfully then we need to redirect
    // user somewhere probably to user/admin dashboard
    const [values,setValues] = useState({
        email:"A@mail.com",
        password:"12345",
        error:"",
        loading: false,
        didRedirect: false
    });

    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();
    // notice in index.js of auth>helper isAuthenticated is giving jwt tokens 
    // to check so we are storing it here.

    const handleChange = name => event => {
        // remember ... loads existing values
        setValues({...values,error: false,[name]: event.target.value})
    }

    const onSubmit =event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
        // here loading is false, since sending data to backend kind of things are
        // done, so now loading is false.
                setValues({...values,error:data.error,loading:false})
            }else{
            // notice in auth>helper>index.js our authenticate takes data as argument
            // and also a next so we can fire a call back.
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                    didRedirect:true});
                });
            }
        })
        .catch(console.log("signin request failed."))
    };

    const performRedirect =() =>{

        // This method will judge whether we should be making a redirect or not.
        if(didRedirect){
            // notice we are getting this user from isAuthenticated.
            if(user && user.role === 1 ){
                // returning is bad idea here coz of protecting route.
                return <Redirect to="/admin/dashboard"/>;
            }else{
                return <Redirect to="/user/dashboard"/>;
            }
        }
        if(isAuthenticated()){
            return < Redirect to="/" />;
        }
    };
    
    const loadingMessage = () => {
        return(
            // here its basically , if loading is true,
            // then right side of && componenet if always will be treated true, 
            // coz it is just a component.
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    };

    const errorMessage = () => {
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div 
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
                >
                {error}
                </div>
            </div>
        </div>);
    };
    

    const signInForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            value={email} 
                            onChange={handleChange("email")}
                            className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            value={password}
                            onChange={handleChange("password")}
                            className="form-control" type="password" />
                        </div>
                        <button 
                        onClick={onSubmit}
                        className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return(
        <Base title="Sign In Page" 
        description= "A page with user to sign in!">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        <p className="text-white text-center" >{JSON.stringify(values)}</p>
        {/* if we only put {values} then it gives error. so we access it
        using JSON.stringify(values) */}
        </Base>
    )
}

export default Signin;