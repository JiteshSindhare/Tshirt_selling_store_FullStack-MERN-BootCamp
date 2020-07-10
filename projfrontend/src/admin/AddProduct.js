import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const AddProduct = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories: [],
        category:"",
        loading:false,
        error:"",
        createProduct:"",
        getaReadirect:false,
        formData:"",
    });
    // categories is [] array coz we will store multiple things in it.
    // getaRedirect: if we get this then we redirect use back to homepage.
    // formdata: the form we are using is not usual html form. we need to prepare that
    // into an object of form data so that all of this information can be submitted
    // to the backend. React has facility for this things inbuilt.

    // destructuring variables in our values state, so that they are directly available.
    const { name,description,price,stock, 
        categories, category, loading, error,
    createProduct, getaReadirect, formData} = values;

    // preload is used to load all the categories before hand to show them in 
    // drop down menu.
    const preload =()=>{
        getCategories().then(data=>{
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                // setting categories coz we want to preload categories only here.
                //  to show in drop down menu.
                setValues({...values,categories:data,
                    formData: new FormData()})
                // just cleaning/reinitialize our form data. to make sure
                //  our form data is active and ready to be filled with value.
                // new FormData() is given by react by default to initilize formdata.
                console.log("--CATEGORIES:".categories);
            }
        });
    };

    useEffect(() => {
        preload();
    }, [])
     
    const onSubmit =()=>{
        // 
    }

    const handleChange =name => event =>{
        // 
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {/* .map() gives a callback thats why we are able to use an arrow
              function in it. it gives element and index of that element. */}
              {categories && 
              categories.map((cate,index)=>(
                //   ._id and name is we are getting of every category.
                //  yes each category has an id name etc, can cross check in DB.
                  <option key={index} value={cate._id}>{cate.name}
                  </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("quantity")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" 
          onClick={onSubmit} 
          className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base
        title="Add a product"
        description="Welcome to product creation section."
        className="container bg-info p-4">
            {/* p-4 adds padding of 4 from all sides. */}

        <Link to="/admin/dashboard"
        className="btn btn-md btn-dark mb-3">
            Admin Home
            </Link>    
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {/* offset-md-2 it shifts 2 columns on the right hand side. */}
                {createProductForm()}
            </div>
        </div>
        </Base>
    );
};

export default AddProduct;
