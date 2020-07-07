import React from "react"
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated } from "."

// writing component like this form docs, we can mention property of component like this.
const PrivateRoute = ({ component :Component, ...rest }) => {
// took this function from https://reactrouter.com/web/example/auth-workflow
    return (
      <Route
        {...rest}
        render={ props =>
          isAuthenticated() ? (
            <Component {...props} />
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


  export default PrivateRoute;