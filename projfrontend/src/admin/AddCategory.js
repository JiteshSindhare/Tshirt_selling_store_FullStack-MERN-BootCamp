import React, {useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    // 1st index is the value that we will get.
    // 2nd index is the setter method which sets the value inside the 
    // object/variable in 1st index.
    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    // this method isAuthenticated() gives both user and token which is inside jwt.
    const {user,token} = isAuthenticated();

    const goBack=()=>(
        <div className="mt-5">
            <Link 
            className="btn btn-small btn-info mb-3"
            to="/admin/dashboard"
            >
            Admin home
            </Link>
        </div>
    );

    const handleChange =(event)=>{
        setError("");
        // this will put value inside the of the field where we used this function
        // to our state [name,setName] so that we an use that value while submitting.
        setName(event.target.value);
    };

    const onSubmit =(event) =>{
        // to prevent default submission.
        event.preventDefault();
        setError("");
        setSuccess(false);
        // Backend request fired
        // using user and token we destructured from isAuthenticated.
        //  putting name in {} coz in createCategory method in adminapicall
        // we are json.stringify our category name.
        createCategory(user._id,token,{name})
        // we could also do a catch after then but since we are handling
        // error in then only so there is not need of catch for now.
            .then(data=>{
                if(data.error){
                    setError(true);
                }else{
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });
    };

    const successMessage=()=>{
        if(success){
        return <h4 className="text-success">Category created successfully.</h4>
        }
    }

    const warningMessage=()=>{
        if(error){
            return <h4 className="text-success">
                Failed to create category.</h4>
            }
    }
    const myCategoryForm =() =>(
        <form>
            {/* form group makes it nice easy and big. */}
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For e.g. Summer"
                />
                <button 
                className="btn btn-outline-info"
                onClick={onSubmit}
                >
                    Create Category.
                </button>
            </div>
        </form>
    );

    return (
        // we are only taking container in className coz container0fluid is pretty wide
        // and we want a lil smaller one.
        <Base title="create a category here "
        description="Add a new categoyr for new t-shirts"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;