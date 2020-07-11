import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

// can also make function and export in same line like below comment.
// export default function Routes(){

const Routes = () => {
    return(
        //this is how we do Route, see test learnreact Route in
        //testfrontend.
        <BrowserRouter>
        <Switch>
            {/* this Home is inside core > Home.js*/}
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute 
            path="/admin/categories" 
            exact component={ManageCategories} />
            <AdminRoute 
            path="/admin/create/product"
            exact component={AddProduct} />
            <AdminRoute 
            path="/admin/products"
            exact component={ManageProducts} />
            <AdminRoute 
            // notice how a a productId is written here. (its not in backtick ofcoursee.)
            path="/admin/product/update/:productId"
            exact component={ UpdateProduct }/>
        </Switch>
        </BrowserRouter>
    );
};

// exporting our Routes function, so that to use it somewhere else.
export default Routes;