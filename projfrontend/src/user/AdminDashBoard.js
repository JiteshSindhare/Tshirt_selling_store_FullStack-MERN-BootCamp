import React from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import { Link } from 'react-router-dom';


const AdminDashBoard = ()=> {
    const { 
        user:{ name,email,role }
        } = isAuthenticated();

    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation.
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link
                        to="/admin/create/category"
                         className="nav-link text-info">
                             Create Categories.
                             </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                        to="/admin/categories"
                         className="nav-link text-info">
                             Manage Categories.
                             </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                        to="/admin/create/product"
                         className="nav-link text-info">
                             Create Product.
                             </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                        to="/admin/orders"
                         className="nav-link text-info">
                             Manage Orders.
                             </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                        to="/admin/products"
                         className="nav-link text-info">
                             Manage Product.
                             </Link>
                    </li>
                </ul>
            </div>
        )
    };

    const adminRightSide = () => {
        return(
            // mb-4 is margin bottom of 4.
            <div className="card mb-4">
                <h4 className="card-header"> Admind Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">
                            Name:
                        </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">
                            Email:
                        </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }
    
    return (
        <Base 
        title="Welcom to admin area"
        description="Manage all products here."
        className="container bg-info p-4">
            <div className="row">
                {/* col-3 and col-9 is coz , remember bootstrap by default divided
                screen in 12 columns, so if we are only having two columns
                and one part is having 3cols width so obviously other part will be
                having 12-3=9 part of the width of screen. just for design */}
                <div className="col-3">
                {adminLeftSide()}
                </div>
                <div className="col-9">
                {adminRightSide()}
                </div>
            </div> 
        </Base>
    )
}

export default AdminDashBoard;