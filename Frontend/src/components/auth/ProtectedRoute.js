import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "components/auth/auth.js";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (auth.isAuthenticated()) {
                return <Component {...props} />;
            } else {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        }} />
    );
};

export const ProtectedLoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (auth.isAuthenticated()) {
                // AGREGAR OTRA OPCION PARA QUE RETORNE A UNA RUTA ADMIN
                return <Redirect to={{ pathname: "/perfil", state: { from: props.location } }} />
            } else {
                return <Component {...props} />;
            }
        }} />
    );
};

