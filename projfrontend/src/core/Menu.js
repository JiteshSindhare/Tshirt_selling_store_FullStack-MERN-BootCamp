import React,{Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import { signout, isAuthenticated } from "../auth/helper"

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
             {isAuthenticated() && isAuthenticated().user.role ===0 && (
            <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} 
                className="nav-link" to="/user/dashboard">
                    User Dashboard
                </Link>
            </li>
             )}
             {isAuthenticated() && isAuthenticated().user.role===1 && (
            <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} 
                className="nav-link" to="/admin/dashboard">
                    Admin Dashboard
                </Link>
            </li>
             )}
             {!isAuthenticated() && (
                <Fragment>
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
                </Fragment>
             )}
             {isAuthenticated() && (
            <li className="nav-item">
                <span
                className="nav-link text-warning"
                // can also do it like onCLick={signout()}
                // since we ahv already imported signout
                // but we won't do that here , since our signout mehtod
                //  is like a middleware i.e. we can singout and then redirect user.
                // onClick itself gives us a callback that we can fire directly, so we can use arrow function here.
                onClick={() =>{
                    // this callback in signout is coz , signout is a middleware i.e. it uses next
                    // so after signout this arrow method inside that will run.
                    signout( () => {
                        // this is just telling to route to "/" i.e. home directory here.
                        history.push("/")
                    })
                }}
                >
                    Signout
                </span>
            </li>
             )}
         </ul>
     </div>     
 )

/** NOTE: whenever we want to wrap anything :
 * 1.>on to a block level - we use <div> </div>
 * 2.> on to a line level - we use <span> </span>
 * React.Fragment is almost like a div, it does not keep all elements inside it
 * like div, but it is for multiple lines or components and keep them as it is.
 * /

/**
 * we can also do conditional rendering of signout by something like this.
 * if(isAuthenticated){
 *  signout  
 * } else {
 *  "" }
 * also using this way.
 *  { isAuthenticated() && signout }
 *  signout is a method ora component it will always be true since its something.
 *  so it will show signout if it isAusthenticated otherwise not.
 */



//  wrapping it with Router coz we will be using it with router.
// Now it will pick up all the route using the links from the file 
// route.js
export default withRouter(Menu);