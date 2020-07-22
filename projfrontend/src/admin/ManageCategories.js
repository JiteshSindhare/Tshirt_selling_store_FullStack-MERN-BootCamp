import React, {useEffect , useState} from 'react'
import { Link } from "react-router-dom" ;
import Base from "../core/Base" ;
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';


const ManageCategories=()=> {
    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();

    const preload= () =>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                // this are not objects but array so we are simply storing products in it.
                setCategories(data);
            }
        });
    };
    // see hooks useEffect/preload in react docs, this is how to preload things.
    useEffect(() => {
        preload();
    }, []);

    const deleteOneCategory =categoryId =>{
        deleteCategory(categoryId,user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            // to reload our component categories after deleting this category.
            }
        });
    };

    return (
        <Base title="Welcome admin" description="Manage products here">
          <h2 className="mb-4">All products:</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
          <div className="row">
            <div className="col-12">
              <h2 className="text-center text-white my-3">Total 3 products</h2>
            {/* map() gives a callback and in that callback we have 
            element and index of that elemetn.*/}
              { categories.map((category,index) =>{
                //   key is here to make sure that we are not looping through same 
                // object.
                            return (<div key={index} className="row text-center mb-2 ">
                            <div className="col-4">
                              <h3 className="text-white text-left">{category.name}</h3>
                            </div>
                            <div className="col-4">
                              <Link
                                className="btn btn-success"
                                to={`/admin/category/update/${category._id}`}
                              >
                                <span className="">Update</span>
                              </Link>
                            </div>
                            <div className="col-4">
                                {/* we can use this bootstrap classes in span or in the button itself
                                like we are usign below, or in the Link we are using above. */}
                              <button 
                              onClick={() => {
                                  deleteOneCategory(category._id)
                              }} className="btn btn-danger">
                                  {/* we can write it directly as: deleteOneProdct(product._id)
                                  but that is not proper way to do in onClick when we are passing
                                  some argument in onClick, coz remember when we call a method in 
                                  onClick then we write it like methodCall "without ()". so we have
                                   written it in this callback way like in above onClick method.  */}
                                Delete
                              </button>
                            </div>
                        </div>
                        ); 
                })}
            </div>
          </div>
        </Base>
        )
};

export default ManageCategories;
