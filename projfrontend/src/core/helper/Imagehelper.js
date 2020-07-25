import React from 'react'
import { API } from '../../backend';

 const Imagehelper = ({product}) => {
    //  this variable imageurl is for conditional loading of image, i.e. if nobody
    // passes image in this card, then we see a default card.
    // "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    // const def_image= "https://cdn.pixabay.com/photo/2017/08/04/05/37/coming-soon-2579123_1280.jpg";
    const imageurl = product ? `${API}/product/photo/${product._id}` 
     : "https://cdn.pixabay.com/photo/2017/08/04/05/37/coming-soon-2579123_1280.jpg";
    return (
        <div className="rounded border border-success p-2">

        <img
        // this location in source is the API we have in product routes of our backend
        // to get photo of a product based on productId.
          src={imageurl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        /> 

      </div>
    );
};

export default Imagehelper;