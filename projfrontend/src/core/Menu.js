import React from 'react'
import {Link, withRouter} from "react-router-dom"


// withRouter will help us to have compatibality between nav bar and 
// as well the router file that we have created.
 const Menu = () => (
     <div>
         <ul className="nav nav-tabs bg-dark">
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Home
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Cart
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Dashboard
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Admin Dashboard
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Signup
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Sign In
                 </Link>
             </li>
             <li className="nav-item">
                 <Link className="nav-link" to="/">
                     Sign Out
                 </Link>
             </li>
         </ul>
     </div>     
 )


//  wrapping it with Router coz we will be using it with router.
// Now it will pick up all the route using the links from the file 
// route.js
export default withRouter(Menu);