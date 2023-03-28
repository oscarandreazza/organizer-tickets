import { Routes, Route } from "react-router-dom";
import WrapperRouter from "./WrapperRoute";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";

export default function Root() {
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={
                    <WrapperRouter>
                        <Signin />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="/register"
                element={
                    <WrapperRouter>
                        <Signup />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="/dashboard"
                element={
                    <WrapperRouter isPrivate>
                        <Dashboard />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="/profile"
                element={
                    <WrapperRouter isPrivate>
                        <Profile />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="customers"
                element={
                    <WrapperRouter isPrivate>
                        <Customers />
                    </WrapperRouter>
                }
            />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}
