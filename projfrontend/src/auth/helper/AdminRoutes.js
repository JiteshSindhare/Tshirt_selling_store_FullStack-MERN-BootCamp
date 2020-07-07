import React from "react"
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated } from "."

// writing component like this form docs, we can mention property of component like this.
const AdminRoute = ({ component :Component, ...rest }) => {
// took this function from https://reactrouter.com/web/example/auth-workflow
    return (
      <Route
        {...rest}
        render={ props =>
            //  our isAuthenticated also sends us whole user data, so 
            // we can extract user data from it and check role.
          isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Component {...props} />
            /** why Component {...props} ???
             * Ans: we will be able to add Admin routes in Routes.js like this
             * <Route path="/signup" exact component={Signup} />
             *  notice how <Route > has property like component, path.
             * same we will be do like. 
             * So props is giving us this properties of routes in AdminRoute.
             * component is AdminRoute.
             * <AdminRoute path="/andAdminRoute" exact component={anyAdminPge}
             */
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


  export default AdminRoute;