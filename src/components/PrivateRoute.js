import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...initProps }) => {
    return (
        <Route
            {...initProps}
            render={props => 
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
}

export default PrivateRoute;