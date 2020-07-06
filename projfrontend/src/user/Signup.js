import React,{useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper";

const Signup=()=>{
    // here in such variables, whatever we say in 1st index of []
    // 2nd index contains same but set attached with it. like below
    // [value,setValues], [name,setName] etc kind of like this.
    // useState can be default of many thigns, objects boolean values etc.
    const [values,setValues] = useState({
        name:  "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    // how to access this values in useState, Values.name, values.email etc.
    // so instead of using this long name like Values.name we are destructuring it.

    const {name,email,password,error,success} = values

    // we are saying that whatever comes up in name, we are just passing it to
    // event and then doing things in event.
    const handleChange = name => event => {
        // remember ... loads existing values
        setValues({...values,error: false,[name]: event.target.value})
        // we are going to pass on multiple values from name (which is written before
        // => event=>) ,so whatever the value does name has we will fill it with event.target.vlaue
        // event.target.value is the name we are getting by form notice we called
        // handleChange("name") so it will send the content of input box in event.target.value
        // name => event => , here this name will be changed by the argument with which we are calling
        // handleChange() like if email then it will take email form useState change email, 
        // if name then it will change name etc.
        //  this is like short for making separate methods for each different input box.
        // like separate method for name, then separate for email and password.
        //  so this method is alternative of that.
    }

    const onSubmit = event => {
        // this method will run when onClick even will be executed.
        event.preventDefault();
        // default action is when we submit the form then it takes it somewhere else.
        // so we prevented taht default action. and will do some other stuff.
        setValues({...values, error:false})

        // now we will call that signup method that we have in src>auth>helper>index.js
        // see signup in helper it takes one argument.
        signup({name,email,password})
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
            // since all the data already went to backend and gave its result
            // now we want to clear those fields.
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success: true
                });
            }
        })
        .catch(console.log("Error in signup"));
    }

    const signUpForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" 
                            onChange={handleChange("name")} 
                            type="text"
                            value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control"
                            onChange={handleChange("email")} 
                             type="email"
                             value={email}
                             />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control"
                            onChange={handleChange("password")} 
                            type="password" 
                            value={password}
                            />
                        </div>
                        <button
                        onClick={onSubmit}
                         className="btn btn-success btn-block">
                            Submit
                            </button>
                    </form>
                </div>
            </div>
        );
    };
    // when we want somethign to run immediately i.e. without waiting or anything
    // then we use method name with parenthesis () like signUpForm()
    // so thats why in onClick={onSubmit} of above form that means wait for
    // some event or some time.

    const successMessage = () => {
        // notice this style in div, it is "write on the go" style
        //the way display is written is flex box property of bootstrap.
        //  notice we used ternary if operator in display ,
        // if success then it will show, otherwise not.
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div 
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
                >
                New account was created successfully. Please{" "}
                <Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>);
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
    
    return(
        <Base title="Sign up Page" 
        description= "A page with user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    );
};

export default Signup;