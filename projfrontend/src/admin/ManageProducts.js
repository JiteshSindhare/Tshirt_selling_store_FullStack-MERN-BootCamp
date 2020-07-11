import React, {useEffect , useState} from 'react'
import { Link } from "react-router-dom" ;
import Base from "../core/Base" ;
import { isAuthenticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts =() => {
    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const preload= () =>{
        getProducts().then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                // this are not objects but array so we are simply storing products in it.
                setProducts(data);
            }
        });
    };
    // see hooks useEffect/preload in react docs, this is how to preload things.
    useEffect(() => {
        preload();
    }, []);

    const deleteOneProdct = productId =>{
        deleteProduct(user._id,token,productId).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                preload();
                //  we should reload the component so that user is able to see that the 
                // product is deleted. so we can relaod again by hitting preload again.
            }
        })
    }
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
          { products.map((product,index) =>{
            //   key is here to make sure that we are not looping through same 
            // object.
                        return (<div key={index} className="row text-center mb-2 ">
                        <div className="col-4">
                          <h3 className="text-white text-left">{product.name}</h3>
                        </div>
                        <div className="col-4">
                          <Link
                            className="btn btn-success"
                            to={`/admin/product/update/${product._id}`}
                          >
                            <span className="">Update</span>
                          </Link>
                        </div>
                        <div className="col-4">
                            {/* we can use this bootstrap classes in span or in the button itself
                            like we are usign below, or in the Link we are using above. */}
                          <button 
                          onClick={() => {
                              deleteOneProdct(product._id)
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

export default ManageProducts;