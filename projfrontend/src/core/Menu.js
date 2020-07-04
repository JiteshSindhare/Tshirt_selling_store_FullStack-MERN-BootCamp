import React from 'react'
import {Link, withRouter} from "react-router-dom"


const currentTab = (history,path)=>{
    if(history.location.pathname === path){
    // we are saying that if path of history is equal to active path
    // then making it all white colour.
        return {color:"#45CE30"}
    }else{
        return {color:"#FFFFFF"}
    }
}
// withRouter will help us to have compatibality between nav bar and 
// as well the router file that we have created.
 const Menu = ({history}) => (
    //  we need to pass history here coz we are using it to call currentTab.
     <div>
         <ul className="nav nav-tabs bg-dark">
             <li className="nav-item">
                 <Link style={currentTab(history,"/")} 
                 className="nav-link" to="/">
                     Home
                 </Link>
             </li>
             <li className="nav-item">
                 <Link style={currentTab(history,"/cart")} 
                 className="nav-link" to="/cart">
                     Cart
                 </Link>
             </li>
             <li className="nav-item">
                 <Link style={currentTab(history,"/user/dashboard")} 
                 className="nav-link" to="/user/dashboard">
                     Dashboard
                 </Link>
             </li>
             <li className="nav-item">
                 <Link style={currentTab(history,"/admin/dashboard")} 
                 className="nav-link" to="/admin/dashboard">
                     Admin Dashboard
                 </Link>
             </li>
             <li className="nav-item">
                 <Link 
                 style={currentTab(history,"/signup")}
                 className="nav-link" to="/signup">
                     Signup
                 </Link>
             </li>
             <li className="nav-item">
                 <Link 
                 style={currentTab(history,"/signin")}
                 className="nav-link" to="/signin">
                     Sign In
                 </Link>
             </li>
             <li className="nav-item">
                 <Link 
                 style={currentTab(history,"/signout")}
                 className="nav-link" to="/signout">
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