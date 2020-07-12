import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { getCategories, getProduct , updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const UpdateProduct = () => {

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
        createdProduct:"",
        getaRedirect:false,
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
    createdProduct, getaRedirect, formData} = values;

    // preload is used to load all the categories before hand to show them in 
    // drop down menu.
    const preload =(productId)=>{
        getProduct(productId).then(data=>{
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                // setting categories coz we want to preload categories only here.
                //  to show in drop down menu.
                setValues({
                    ...values,
                    name:data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
                // just cleaning/reinitialize our form data. to make sure
                //  our form data is active and ready to be filled with value.
                // new FormData() is given by react by default to initilize formdata.
                console.log("--CATEGORIES:".categories);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);
     
    // TODO
    const onSubmit = event =>{
      event.preventDefault();
        // setting error to initial state , coz probably there might be an existing 
        // submitted ofrm that might raise the error. so making error empty.
      setValues({...values, error:"", loading:true});
      updateProduct(user._id, token, formData).then(data => {
          console.log("print it------",data);
          if(data.error){
              setValues({...values, error: data.error });
          }else{
              setValues({
                  ...values,
                  name: "",
                  description: "",
                  price: "",
                  photo: "",
                  stock: "",
                  loading: false,
                  createdProduct: data.name,
                //   check redirect.
                  getaRedirect: true,
              });
          }
      });
    };

    const performRedirect =() =>{
            console.log(getaRedirect);
            if(getaRedirect){
            setTimeout(() =>{
                console.log('yes it is printing after 2 seconds')
                    return <Redirect to="/admin/dashboard"/>;           
            },2000);
        }
    };
    // handleChange  is for what do we want to do , when somebody loads image
    // and everything.
    const handleChange =name => event =>{
        // event.target.file[0] means we want to have path of the file so 
        // that I can load this file here.
        const value = name =="photo" ? event.target.files[0] : event.target.value
        // setting formData with name of the field from where this function is getting
        // called and saving it value in formdata. so that we can pass it on to
        //  backend.
        formData.set(name,value);
        // in setValues we are loading pre set values then setting value of the field
        // through which this method is getting called.
        setValues({...values,[name]:value});
    };

    const successMessage =() =>(
        <div 
        className="alert alert-success mt-3"
        // createdProduct is treated for conditional.
        // if it is empty than its false otherwise true.
        // so if product is created than "" means display the product otherwise 
        // don't display anything.
        style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>{createdProduct} created successfully.</h4>
        </div>
    );

    const errorMessage = () =>(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <div 
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
            >
            {error}
            </div>
        </div>
    </div>
    );
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
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
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
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
                {performRedirect()}
            </div>
        </div>
        </Base>
    );
};

export default UpdateProduct;
